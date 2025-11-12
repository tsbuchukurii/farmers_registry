const layout = ({children}) => {
    return (<>
        <div className="flex h-screen w-screen overflow-hidden">
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-900 to-emerald-700 relative">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop"
                        alt="Agricultural landscape"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent"></div>
                </div>

                <div className="relative z-10 flex flex-col justify-between w-full">
                    <div className="flex items-center bg-green-900/50 px-12 py-10 w-full mt-10 space-x-3">
                        <img
                            src="https://rda.gov.ge/_nuxt/img/logo.d7ddd12.svg"
                            alt="Agricultural landscape"
                            className="object-cover opacity-90 h-10"
                        />
                        <div className="text-white">
                            <h1 className="text-2xl font-bold leading-tight">
                                სოფლის განვითარების სააგენტოს<br />
                                ფერმერთა რეესტრი
                            </h1>
                        </div>
                    </div>

                    <div className="bottom-12 relative bg-green-900/50 px-12 py-10 w-full">
                        <p className="text-white text-lg leading-relaxed font-medium">
                            "ფერმერული მეურნეობებისა და სოფლად არსებული საწარმოების რეესტრი წარმოადგენს საქართველოში არსებულ ფერმერებისა და ფერმერული მეურნეობების სანდო, გამჭირვალე და ერთიან ციფრულ ბაზას"
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center justify-between bg-white border-32 border-green-900 p-8 min-h-screen">
                <div className="w-full max-w-md flex-grow flex items-center justify-center">
                    {children}
                </div>

                <footer className="mt-6 text-center w-full absolute bottom-2">
                    <p className="text-xs text-white">
                        © ყველა უფლება დაცულია | შექმნილია IT დეპარტამენტის მიერ
                    </p>
                </footer>
            </div>


            {/*<div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-8">*/}
            {/*    <div className="w-full max-w-md">*/}
            {/*        {children}*/}
            {/*        <div className="mt-6 text-center">*/}
            {/*            <p className="text-sm text-gray-600">*/}
            {/*                © ყველა უფლება დაცულია | შექმნილია IT დეპარტამენტის მიერ*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    </>);
}

export default layout;