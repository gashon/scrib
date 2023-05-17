FROM node:20-alpine3.16 as base
WORKDIR /app
RUN apk add --no-cache --virtual .build-deps \
    python3 \
    make \
    g++ \
    && npm install -g pnpm \
    && apk del .build-deps
# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

FROM base as dependencies
COPY scripts ./scripts/
COPY packages/config ./packages/config/
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tailwind.config.js turbo.json ./
RUN --mount=type=cache,target=/root/.pnpm pnpm fetch
RUN --mount=type=cache,target=/root/.pnpm pnpm install --frozen-lockfile

FROM dependencies as api-dependencies
ARG DOPPLER_API_TOKEN
ENV DOPPLER_API_TOKEN=$DOPPLER_API_TOKEN
COPY packages/db/package.json ./packages/db/
RUN --mount=type=cache,target=/root/.pnpm pnpm install --frozen-lockfile
COPY apps/api/package.json ./apps/api/
RUN --mount=type=cache,target=/root/.pnpm pnpm install --frozen-lockfile
COPY apps/api/ ./apps/api/ 
COPY packages/db/ ./packages/db/

FROM dependencies as web-dependencies
ARG DOPPLER_WEB_TOKEN
ENV DOPPLER_WEB_TOKEN=$DOPPLER_WEB_TOKEN
COPY packages/ui/package.json ./packages/ui/
COPY packages/db/package.json ./packages/db/
COPY packages/editor/package.json ./packages/editor/
RUN --mount=type=cache,target=/root/.pnpm pnpm install --frozen-lockfile
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
RUN --mount=type=cache,target=/root/.pnpm pnpm install --frozen-lockfile
COPY apps/api/ ./apps/api/
COPY apps/web/ ./apps/web/
COPY packages/db/ ./packages/db/
COPY packages/ui/ ./packages/ui/
COPY packages/editor/ ./packages/editor/

FROM api-dependencies as api
RUN pnpm run apps:build 
CMD ["pnpm", "run", "apps:start", "--filter", "@scrib/api"]

FROM web-dependencies as web
RUN pnpm run apps:build 
CMD ["pnpm", "run", "apps:start", "--filter", "@scrib/web"]