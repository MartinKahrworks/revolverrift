import bgImage from '../../assets/Texturelabs_Grunge_353M.webp';

function Partners() {

    const cardData = [
  {
    title: " Stage 1 Creator",
    description: "For all streamers and content creators regardless of existing partnerships.",
    benefits: [
      "Access to all DLCs",
      "Drops for your community",
      "Your own custom server"
    ]
  },
  {
    title: " Stage 2 Partner",
    description: "Requirement: At least *1 year of active streaming experience*.",
    benefits: [
      "All Stage 1 benefits",
      "Custom server with personal statistics",
      "Access to the Developer WhatsApp group for direct communication with our team",
      "Participation in the annual partner raffle with valuable prizes"
    ]
  },
  {
    title: " Stage 3 Ambassador",
    description: "The highest tier of our partnership program – exclusive and individually tailored.",
    benefits: [
      "All Stage 2 benefits",
      "Custom made graphic material for your stream, designed exclusively for you",
      "Monthly support provided by KAHRWORKS",
      "Additional hardware support",
      "Further conditions will be shared after an official request via email"
    ]
  }
];

    return(
        <section className="min-h-screen w-full bg-fixed bg-cover overflow-x-hidden  py-20"

         style={{ backgroundImage: `url(${bgImage})` }}
         >
            <div className="text-base md:text-lg pt-28  leading-relaxed text-gray-300 space-y-4 bg-left ">
                <h2 className="font-semibold font-custom text-[#e4d6c3] pb-6 flex justify-center text-3xl md:text-4xl lg:text-5xl">
                    Revolver Rift Partnership Program
                </h2>
                <div className=" text-white rounded-2xl shadow-lg p-8 text-center max-w-2xl mx-auto">
                    <p>
                        Become part of the <span className="font-bold text-[#AA0000]">Revolver Rift Community </span> 
                        and join us on our journey to make this game a global success!
                    </p>
                    <p className="mt-4">
                        Our partnership program offers exclusive benefits for content creators and streamers, divided into three tiers based on engagement and reach.
                    
                    </p>
                    <p className="mt-4">
                         Anyone can apply – whether you are a newcomer or an established streamer.
                    </p>
                </div>
            </div>
            <div className="text-base md:text-lg pt-28  leading-relaxed text-gray-300 space-y-4 bg-left font-Inter">
                <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-24 p-10 cursor-pointer overflow-hidden">

                    {cardData.map((card, index) => (
                        <div
                        key={index}
                        className="bg-[#1E1E1E] text-[#F5F5F5] border border-[#AA0000] bg-opacity-100 text-white rounded-2xl shadow-lg p-6 w-full md:w-1/3 hover:scale-105 transition-transform duration-300"
                        >
                        
                        <h2 className="font-semibold font-custom text-[#e4d6c3] pb-6 flex justify-center text-3xl md:text-4xl lg:text-4xl">{card.title}</h2>

                        <p className="text-gray-300 font-Inter mb-4">{card.description}</p>
                        <ul className="list-disc list-inside text-gray-200 space-y-1">
                            {card.benefits.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
                            ))}
                        </ul>
                        </div>
                     ))}
                </div>
            </div>
            
            <div 
            //  data-aos="fade-up"
            className="text-base md:text-lg leading-relaxed text-gray-300 space-y-4 bg-left  text-white rounded-2xl shadow-lg p-6 text-center max-w-2xl mx-auto">
                <h2 className="font-semibold font-custom text-[#e4d6c3] pt-28 pb-4 flex justify-center text-3xl md:text-4xl lg:text-5xl">
                    Application & Process
                </h2>
               
                    <p className="text-base md:text-lg leading-relaxed text-gray-300 space-y-4 bg-left  text-white rounded-2xl shadow-lg p-2 text-center max-w-2xl mx-auto">
                        Everyone is welcome to apply for the partnership program. 
                    </p>
                    <p className=" text-white rounded-2xl shadow-lg p-2 text-center max-w-2xl mx-auto">
                        Once your application is received, our team will carefully review it to determine which tier is the best fit for you. 
                    </p>
                    <p className=" text-white rounded-2xl shadow-lg p-2 text-center max-w-2xl mx-auto">
                        Please note: The final decision rests solely with KAHRWORKS and may take 1–2 months
                    </p>
                    
                <br/>
                <br/>
                <h2 className="font-semibold font-custom text-[#e4d6c3] pb-20 flex justify-center text-3xl md:text-4xl lg:text-5xl">
                    Apply now and become part of the Revolver Rift Partner Community!
                </h2>
            </div>
        </section>
    )
}

export default Partners;