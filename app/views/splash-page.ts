import { NavigatedData, Page, Frame } from '@nativescript/core';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    
    // Navigate to home page after 2 seconds
    setTimeout(() => {
        Frame.topmost().navigate({
            moduleName: "views/home-page",
            clearHistory: true,
            transition: {
                name: "fade",
                duration: 500
            }
        });
    }, 2000);
}