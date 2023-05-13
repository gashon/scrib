import { Button } from '@scrib/ui/components';
import Link from 'next/link';

export default function Web() {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <section className="fixed w-full">
        <div className="z-20 flex flex-row justify-end items-center w-full h-16 px-4">
          <Link href="/auth">
            <div className="border-black border rounded px-4 py-2">
              Register/Login
            </div>
          </Link>
        </div>
      </section>

      <main className="w-full h-screen flex items-center px-12 justify-between">
        <div className="flex flex-col z-10">
          <h1
            style={{
              fontFamily: 'Inter',
              fontSize: '10rem',
            }}
            className="p-0"
          >
            Scrib.
          </h1>
          <p className="text-xl underline">A place to write</p>
        </div>

        {/* https://fffuel.co/llline/ */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 800 800"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="uundulate-grad"
            >
              <stop
                stop-color="hsl(0, 0%, 0%)"
                stop-opacity="1"
                offset="45%"
              ></stop>
              <stop
                stop-color="hsl(0, 0%, 63%)"
                stop-opacity="1"
                offset="100%"
              ></stop>
            </linearGradient>
          </defs>
          <g stroke-width="1" stroke="url(#uundulate-grad)" fill="none">
            <path d="M709.7838444633859 62.013690571336156C756.1321043178446 267.15103836130925 637.0619886023346 852.3238013539485 508.0750905558689 906.9190160114783C379.08819250940337 961.5142306690082 136.99499369481106 529.2080687174522 90.64673384035228 324.070720927479C44.29847398589351 118.93337313750567 156.6165452080026 -23.145038722864456 285.6034432544682 -77.74025338039428C414.5903413009339 -132.33546803792404 663.4355846089271 -143.1236572186371 709.7838444633859 62.013690571336156C756.1321043178446 267.15103836130925 637.0619886023346 852.3238013539485 508.0750905558689 906.9190160114783 "></path>
            <path d="M694.2946583437323 78.91296179228107C738.3255052054681 273.7934421927556 625.2088952757335 829.7075670357626 502.67134213159113 881.5730209604162C380.1337889874487 933.4384748850694 150.14525011358614 522.7476210310913 106.11440325185026 327.86714063061663C62.08355639011444 132.9866602301422 168.7857240511181 -1.987831037209503 291.3232771952605 -53.85328496186281C413.8608303394028 -105.71873888651612 650.2638114819964 -115.96751860819353 694.2946583437323 78.91296179228107C738.3255052054681 273.7934421927556 625.2088952757335 829.7075670357626 502.67134213159113 881.5730209604162 "></path>
            <path d="M678.8054722240786 95.81232456596035C720.5189060930916 280.4359375769362 613.3558019491325 807.0914242703116 497.2675937073134 856.2271174620882C381.1793854654943 905.3628106538649 163.29550653236117 516.2872648974648 121.5820726633483 331.6636518864889C79.86863879433542 147.0400388755129 180.9549028942336 19.169468201179768 297.04311113605263 -29.966224990597027C413.1313193778717 -79.10191818237382 637.0920383550657 -88.81128844501558 678.8054722240786 95.81232456596035C720.5189060930916 280.4359375769362 613.3558019491325 807.0914242703116 497.2675937073134 856.2271174620882 "></path>
            <path d="M663.3162555868468 112.71165682206151C702.7122764631367 287.0784024435387 601.5026781049531 784.4752509872819 491.8638147654574 830.8811834461821C382.22495142596154 877.2871159050826 176.44573243355813 509.8268782462601 137.04971155726815 335.4601326247829C97.65369068097823 161.09338700330568 193.124051219771 40.32673692199097 302.76291455926673 -6.07919553690931C412.4017778987625 -52.48512799580965 623.9202347105568 -61.65508879941575 663.3162555868468 112.71165682206151C702.7122764631367 287.0784024435387 601.5026781049531 784.4752509872819 491.8638147654574 830.8811834461821 "></path>
            <path d="M647.827069467193 129.61095856058455C684.9056773507601 293.7208367925631 589.649584778352 761.8590471866744 486.4600663411795 805.5352189126984C383.270547904007 849.2113906387222 189.59598885233322 503.3664610774774 152.5173809687662 339.25658284549877C115.43877308519916 175.14670461352023 205.29323006288644 61.48397512522405 308.48274850005896 17.807803399200225C411.6722669372315 -25.8683683268236 610.7484615836261 -34.49891967139405 647.827069467193 129.61095856058455C684.9056773507601 293.7208367925631 589.649584778352 761.8590471866744 486.4600663411795 805.5352189126984 "></path>
            <path d="M632.3378833475394 146.51026029910759C667.0990782383835 300.36327114158746 577.796491451751 739.2428433860669 481.05631791690166 780.1892543792142C384.31614438205247 821.1356653723615 202.7462452711083 496.90604390869464 167.98505038026423 343.05303306621465C133.22385548942015 189.20002222373478 217.46240890600194 82.64121332845713 314.2025824408512 41.69480233530976C410.9427559757004 0.7483913421624493 597.5766884566954 -7.342750543372347 632.3378833475394 146.51026029910759C667.0990782383835 300.36327114158746 577.796491451751 739.2428433860669 481.05631791690166 780.1892543792142 "></path>
            <path d="M616.8486972278859 163.40962307278681C649.2924791260069 307.0057665257682 565.9433981251498 716.6267006206153 475.6525694926239 754.8433508808862C385.36174086009794 793.060001141157 215.89650168988334 490.4456877750681 183.4527197917622 346.8495443220868C151.00893789364108 203.25340086910558 229.63158774911744 103.79851256684645 319.9224163816434 65.5818623065756C410.2132450141694 27.365212046304748 584.4049153297647 19.813479619805605 616.8486972278859 163.40962307278681C649.2924791260069 307.0057665257682 565.9433981251498 716.6267006206153 475.6525694926239 754.8433508808862 "></path>
            <path d="M601.359511108232 180.3089248113099C631.4858800136303 313.64820087479245 554.0903047985487 694.0104968200079 470.24882106834605 729.4973863474024C386.4073373381434 764.9842758747966 229.04675810865842 483.9852706062853 198.92038920326024 350.6459945428028C168.794020297862 217.30671847932012 241.80076659223295 124.95575077007948 325.64225032243564 89.46886124268514C409.4837340526383 53.9819717152908 571.2331422028338 46.96964874782731 601.359511108232 180.3089248113099C631.4858800136303 313.64820087479245 554.0903047985487 694.0104968200079 470.24882106834605 729.4973863474024 "></path>
            <path d="M585.8703249885784 197.20822654983294C613.6792809012537 320.2906352238168 542.2372114719476 671.3942930194003 464.8450726440683 704.1514218139182C387.4529338161889 736.908550608436 242.1970145274335 477.52485343750254 214.38805861475822 354.44244476351855C186.579102702083 231.36003608953467 253.96994543534845 146.11298897331255 331.3620842632278 113.35586017879467C408.7542230911072 80.59873138427685 558.0613690759031 74.12581787584901 585.8703249885784 197.20822654983294C613.6792809012537 320.2906352238168 542.2372114719476 671.3942930194003 464.8450726440683 704.1514218139182 "></path>
            <path d="M570.3811083513467 214.10752828835592C595.872651271299 326.9330695728412 530.3840876277684 648.7780892187927 459.4412937022123 678.8054572804341C388.4984997766562 708.8328253420755 255.34724042863047 471.06443626871976 229.85569750867813 358.23889498423455C204.3641545887258 245.41335369974922 266.1390937608858 167.27022717654563 337.0818876864419 137.24285911490426C408.02468161199795 107.2154910532629 544.8895654313943 101.28198700387071 570.3811083513467 214.10752828835592C595.872651271299 326.9330695728412 530.3840876277684 648.7780892187927 459.4412937022123 678.8054572804341 "></path>
            <path d="M554.8919222316929 231.00681476808995C578.0660521589223 333.5754886630765 518.5309943011673 626.1618701593961 454.03754527793444 653.459477488161C389.5440962547017 680.757084816926 268.4974968474055 464.6040038411479 245.3233669201761 362.03532994616137C222.14923699294673 259.4666560511747 278.30827260400133 188.42745012098965 342.8017216272341 161.12984279222474C407.29517065046696 133.83223546345982 531.7177923044635 128.4381408731033 554.8919222316929 231.00681476808995C578.0660521589223 333.5754886630765 518.5309943011673 626.1618701593961 454.03754527793444 653.459477488161 "></path>
            <path d="M539.4027208532502 247.9061470241911C560.2594377877567 340.2179535296791 506.67788571577717 603.5456968763667 448.6337815948676 628.1135434722551C390.5896774739581 652.6813900681434 281.6477380073915 458.14361718994337 260.7910210728851 365.8318106844554C239.93430413837865 273.5200041789674 290.4774361883277 209.58471884180085 348.52154030923725 185.01687224591245C406.5656444301468 160.449025650024 518.5460039187437 155.59434051870312 539.4027208532502 247.9061470241911C560.2594377877567 340.2179535296791 506.67788571577717 603.5456968763667 448.6337815948676 628.1135434722551 "></path>
            <path d="M523.9135499923856 264.8054792802923C542.4528539341691 346.8604183962816 494.82480764796514 580.9295235933372 443.2300484293788 602.7676094563492C391.63528921079256 624.6056953193611 294.7980096849557 451.6832305387387 276.2587057431722 369.6282914227494C257.71940180138864 287.5733523067601 302.6466302902323 230.74198756261205 354.24138950881854 208.9039016996001C405.8361487274048 187.06581583658817 505.3742460506021 182.75054016430295 523.9135499923856 264.8054792802923C542.4528539341691 346.8604183962816 494.82480764796514 580.9295235933372 443.2300484293788 602.7676094563492 "></path>
            <path d="M508.4243486139429 281.7047810188153C524.6462395630035 353.502852745306 482.9716990625749 558.3133197927295 437.826284746312 577.421644922865C392.68087043004897 596.5299700530004 307.9482508449417 445.22281336995593 291.7263598958811 373.42474164346527C275.5044689468205 301.62666991697466 314.8157938745587 251.89922576584507 359.9612081908217 232.79090063570965C405.1066225070847 213.68257550557422 492.20245766488233 209.90670929232465 508.4243486139429 281.7047810188153C524.6462395630035 353.502852745306 482.9716990625749 558.3133197927295 437.826284746312 577.421644922865 "></path>
            <path d="M492.9351777530783 298.6040980161274C506.83965570941587 360.14530235311935 471.11862099476286 535.6971312509111 432.4225515808232 552.07569564817C393.7264821668835 568.454260045429 321.0985225225058 438.7624114599622 307.1940445661682 377.2212071229702C293.28956660983056 315.6800027859783 326.9849879764633 273.0564792278672 365.681057390403 256.6779148306083C404.37712680434265 240.29935043334933 479.0306997967407 237.0628936791354 492.9351777530783 298.6040980161274C506.83965570941587 360.14530235311935 471.11862099476286 535.6971312509111 432.4225515808232 552.07569564817 "></path>
            <path d="M477.4459458570574 315.50343027222857C489.0330108206721 366.78776721972184 459.2654818917946 513.0809579678817 427.01875738017816 526.7297616322642C394.7720328685618 540.3785652966466 334.2487331649137 432.30202480875755 322.661668201299 381.0176878612643C311.0746032376843 329.73335091377095 339.1541210432116 294.2137479486784 371.400845554828 280.56494428429596C403.6475700664444 266.9161406199135 465.8588808934427 264.21909332473524 477.4459458570574 315.50343027222857C489.0330108206721 366.78776721972184 459.2654818917946 513.0809579678817 427.01875738017816 526.7297616322642 "></path>
            <path d="M461.95675973740373 332.4027320107516C471.2264117082955 373.43020156874627 447.4123885651935 490.4647541672741 421.61500895590035 501.38379709878006C395.81762934660725 512.302840030286 347.3989895836888 425.8416076399748 338.12933761279703 384.81413808198016C328.8596856419053 343.7866685239855 351.3232998863271 315.3709861519115 377.1206794956202 304.4519432204055C402.91805910491337 293.53290028889955 452.687107766512 291.37526245275694 461.95675973740373 332.4027320107516C471.2264117082955 373.43020156874627 447.4123885651935 490.4647541672741 421.61500895590035 501.38379709878006 "></path>
            <path d="M446.4675736177501 349.30206426685277C453.41981259591887 380.07266643534876 435.55929523859237 467.8485808842446 416.21126053162254 476.0378630828741C396.86322582465266 484.22714528150357 360.54924600246386 419.38122098877017 353.597007024295 388.61061882027417C346.6447680461262 357.8400166517782 363.49247872944255 336.5282548727227 382.84051343641244 328.3389726740932C402.18854814338226 320.14969047546373 439.5153346395813 318.53146209835677 446.4675736177501 349.30206426685277C453.41981259591887 380.07266643534876 435.55929523859237 467.8485808842446 416.21126053162254 476.0378630828741 "></path>
            <path d="M430.9783874980964 366.2013660053758C435.61321348354227 386.71510078437313 423.7062019119913 445.23237708363706 410.8075121073447 450.69189854939003C397.9088223026981 456.151420015143 373.6995024212389 412.92080381998744 369.06467643579305 392.4070690409901C364.42985045034715 371.8933342619928 375.66165757255806 357.6854930759557 388.5603473772046 352.22597161020275C401.4590371818512 346.7664501444498 426.3435615126505 345.68763122637847 430.9783874980964 366.2013660053758C435.61321348354227 386.71510078437313 423.7062019119913 445.23237708363706 410.8075121073447 450.69189854939003 "></path>
            <path d="M415.48918611965365 383.1006830026879C417.8065991123766 393.35755039218657 411.8530933266011 422.61618854181853 405.4037484242778 425.345949274695C398.95440352195453 428.0757100075715 386.8497435812249 406.4604019099937 384.53233058850196 396.20353452049505C382.21491759577907 385.9466671309964 387.8308211568845 378.84274653797786 394.2801660592078 376.1129858051014C400.72951096153105 373.3832250722249 413.17177312693076 372.84381561318924 415.48918611965365 383.1006830026879C417.8065991123766 393.35755039218657 411.8530933266011 422.61618854181853 405.4037484242778 425.345949274695 "></path>
          </g>
        </svg>
      </main>
    </div>
  );
}
