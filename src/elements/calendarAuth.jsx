
export const CalendarAuth = () => {

    // TODO(developer): Set to client ID and API key from the Developer Console
    const CLIENT_ID = "629541174541-05i8defgkuots1am1p5vvcjvqs5j3vap.apps.googleusercontent.com";
    const API_KEY = "AIzaSyAP2mCxGH4zC5rFPhT5LbwgXaiXPMH-MqY";
    // Discovery doc URL for APIs used by the quickstart
    const DISCOVERY_DOC =
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
    let tokenClient;
    let gapiInited = false;
    let gisInited = false;
    /**
     * Callback after api.js is loaded.
     */
    function gapiLoaded() {
        console.log('gapiloaded')
        gapi.load("client", initializeGapiClient);
    }
    /**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        }, console.log('initializeGapiClient'));
        gapiInited = true;
        maybeEnableButtons();
    }
    /**
     * Callback after Google Identity Services are loaded.
     */
    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: "", // defined later
        }, console.log('gisloaded'));
        gisInited = true;
        maybeEnableButtons();
    }
    /**
     * Enables user interaction after all libraries are loaded.
     */
    function maybeEnableButtons() {
        console.log('maybeEnableButtons')
        if (gapiInited && gisInited) {
            console.log('buttons enabled')
            document.getElementById("authorize_button").style.visibility =
                "visible";
        }
    }
    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick() {
        console.log('handleAuthClick')
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw resp;
            }
            // document.getElementById("signout_button").style.visibility =
            //     "visible";
            document.getElementById("authorize_button").innerText = "Refresh";
            await listUpcomingEvents();
        };
        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({ prompt: "consent" });
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({ prompt: "" });
        }
    }
    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken("");
            document.getElementById("content").innerText = "";
            document.getElementById("authorize_button").innerText = "Authorize";
            document.getElementById("signout_button").style.visibility = "hidden";
        }
    }
    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    async function listUpcomingEvents() {
        console.log('listUpcomingEvents')
        let response;
        try {
            const request = {
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: "startTime",
            };
            response = await gapi.client.calendar.events.list(request);
        } catch (err) {
            document.getElementById("content").innerText = err.message;
            return;
        }

        const events = response.result.items;
        if (!events || events.length == 0) {
            document.getElementById("content").innerText = "No events found.";
            return;
        }
        // Flatten to string to display
        const output = events.reduce(
            (str, event) =>
                `${str}${event.summary} (${event.start.dateTime || event.start.date
                })\n`,
            "Events:\n"
        );
        document.getElementById("content").innerText = output;
    }
    let script1 = '<script async defer src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>'
    let script2 = '<script async defer src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script>'
    return (
        <div >
            <p>Google Calendar API Quickstart</p>
            {/* <!--Add buttons to initiate auth sequence and sign out--> */}
            <button id="authorize_button" onClick={() => { handleAuthClick(); console.log('button clicked!') }}>Authorize</button>
            <button id="signout_button" onClick={() => handleSignoutClick()}>Sign Out</button>
            <div dangerouslySetInnerHTML={{__html: script1}}/>
            <div dangerouslySetInnerHTML={{__html: script2}}/>
            
            <button onClick={() => console.log('click')}>Click Me!</button>
        </div>
    )
}