const btn = document.querySelector('.changeColorBtn')
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');

btn.addEventListener('click', async () => {

    // LIKE THIS WE WILL GET THAT COLOR VARIBALE WE WILL MAKE THE CALLBACK FUNCTION IN IT AND WE WILL BE RECIEVING
    // THAT COLOR OBJECT FROM IT , THIS IS JUST TO SHOW YOU THE HOW THINGS WORKS 
    chrome.storage.sync.get('color', ({ color }) => {
        console.log('color: ', color);
    });


    //    WE WILL BE RECIEVING AN ARRAY THROUGH THIS , AND WE WANT TO GET IT'S FIRST ITEM
    // WE GET SOME INBUILT CHROME API'S AND WE WANT TO GET THAT 
    // THIS WAS JUST TO GET ACCESS TO ALL THE TABS OF CHROME
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab);

    // WE HAVE TO USE EXECUTE THE SCRIPT FUNCTION AND PASS A OBJECT IN IT , THIS IS USED TO INJECT ANY SCRIPT 
    // IN OUR WEB PAGE., WE ARE GIVEING TABID INSIDE TO TELL THAT IS TAB MEI HAME INJECT KRNA HAI , HR TAB KI 
    // EK ID HOTI HAI 
    // JUST GAVE A SECOND PARAMETER TO THIS FUNCTION AS WELL
    chrome.scripting.executeScript({
        // getting this tab.id from above we got a array and some properties through it of tab including tabId
        target: { tabId: tab.id },

        // WHAT WE WANT TO INJECT , WE WANT TO INJECT A FUNCTION
        function: pickColor,
    }, async (injectionresult) => {
        //  HERE WE WILL RECIEVE THE RESPONSE OF THE FUNCTION 
        const [data] = injectionresult;
        if (data.result) {
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerText = color;
        }
        try {
            
        } catch (error) {
            
        }
    })

});


// AB HUME DHYAN DENA HAI JO HAMARA UPR WALA CODE HAI VO HAMARA WEB PAGE MEI RUN NI HORA YE FUNCTION PICKCOLOR RUN 
// HO RAHA HAI WEBPAGE MEI , HENCE JO BHI VARIABLES HUMNE BANAYE HAI UPAR VO HUM IS FUNCTION MEI RUN NHI KR 
// PAYEGE IF YOU WANT TO USE WE CAN BY PASSING A ARGS PROEPRTY AND IN THAT PASSING THE VARIABLE [ DO THAT 
// IN THAT executeScript({}) LIKE YOU DID ABOVE] 

async function pickColor() {

    try {

        // THIS IS INBUILT FEATURE IN CHROME OF EYEDROPPER
        const eyedropper = new EyeDropper;
        // DUE TO THIS OUR EYEDROPPER WILL ACTIVATE
        return await eyedropper.open();

    } catch (error) {
        console.error(error)
    }

}