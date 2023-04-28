import { Context } from '@scrib/api/graphql/context';
import { userType } from '@scrib/api/graphql/schema/types';
import { GraphQLID, GraphQLNonNull } from 'graphql';

export const user = {
    type: userType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'Globally unique ID of the user',
        },
    },
    resolve: async (_: any, args: any, context: Context) => {
        const { id } = args;
        const user = await context.db.userRepository.findById(id);
        return user?.toObject();
    }
};
