document.getElementById("dorkForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const domain = document.getElementById("targetDomain").value;
    const category = document.getElementById("category").value;
    const customDork = document.getElementById("customDork").value;
    const searchType = document.getElementById("searchType").value;

    // Validation for correct data input
    if (!domain && searchType === 'site') {
        document.getElementById("results").innerHTML = `<p style="color:red;">Please enter a valid domain!</p>`;
        return;
    }

    if (searchType === 'site') {
        performSearch(domain, category);
    } else if (searchType === 'custom') {
        if (customDork === '') {
            document.getElementById("results").innerHTML = `<p style="color:red;">Please enter a custom Google Dork query!</p>`;
        } else {
            customSearch(customDork);
        }
    }
});

function performSearch(domain, category) {
    const queries = {
        emails: `site:${domain} "@gmail.com" OR "@yahoo.com" OR "@hotmail.com" OR "@outlook.com" OR "@live.com"`,
        login: `site:${domain} inurl:login OR inurl:signin OR inurl:auth OR inurl:access`,
        config: `inurl:"config.php" OR inurl:"settings.php" OR inurl:"dbconfig.php"`,
        docs: `site:${domain} filetype:pdf OR filetype:xlsx OR filetype:doc OR filetype:csv`,
        vulnerabilities: `inurl:index.php?id= site:${domain} OR inurl:"error" OR inurl:"exception"`,
        devices: `inurl:"/printers" OR inurl:"/cgi-bin/" OR inurl:"/devices"`,
        directories: `intitle:"Index of /" site:${domain} OR inurl:backup OR "directory listing"`,
        backup: `filetype:bak OR filetype:sql OR filetype:tar site:${domain} OR inurl:backup`,
        medical: `inurl:"patient records" OR intitle:"medical history" site:${domain} OR "medical report"`,
        transactions: `inurl:invoice OR inurl:receipt site:${domain} OR "transaction report"`,
        api: `inurl:apikey OR inurl:token OR "API key" site:${domain} OR "API Documentation"`,
        databases: `filetype:sql OR filetype:db OR filetype:mdb site:${domain} OR "database"`,
        cameras: `inurl:view/view.shtml OR intitle:"Live View / - AXIS" site:${domain} OR "security camera"`,
        financial: `intitle:"financial report" OR "annual report" filetype:pdf site:${domain} OR "budget report"`,
        upload: `inurl:upload OR intitle:"file upload" site:${domain} OR "upload your file"`,
        server: `intitle:"Apache Status" OR "Server Version" site:${domain} OR "Nginx Status"`,
        dev: `inurl:dev OR inurl:test OR inurl:staging site:${domain} OR "development site"`,
        github: `site:github.com | site:gitlab.com intitle:"passwords" OR intitle:"secrets" OR "sensitive data"`,
        credentials: `filetype:xls OR filetype:txt "username" "password" site:${domain} OR "login credentials"`,
        network: `inurl:"cgi-bin/" inurl:"main.cgi" OR inurl:"netgear.cfg" OR "router config"`,
        cve: `inurl:cve site:${domain} OR intitle:"CVE" OR "vulnerability"`,
        phpinfo: `ext:php intitle:phpinfo "published by the PHP Group" site:${domain}`,
        ftp: `intitle:"Index of" inurl:ftp site:${domain} OR "ftp login"`,
        printer: `inurl:"/printers" OR inurl:"/jobs" site:${domain} OR "printer status"`,
        customer: `filetype:xls OR filetype:csv "customer data" OR "contact details" site:${domain} OR "customer information"`,
        passwords: `filetype:txt inurl:password site:${domain} OR "password file"`,
        exploits: `intext:"exploit" site:${domain} OR intext:"CVE" OR "known vulnerabilities"`,
        sessions: `inurl:"session" OR inurl:"sid" OR "sessionid" site:${domain} OR "session token"`
    };

    const query = queries[category];
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    // Open search in a new tab
    window.open(searchUrl, "_blank");

    document.getElementById("results").innerHTML = `<p>Searching for: <strong>${query}</strong></p>`;
}

function customSearch(customDork) {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(customDork)}`;

    // Open custom search in a new tab
    window.open(searchUrl, "_blank");

    document.getElementById("results").innerHTML = `<p>Searching with custom query: <strong>${customDork}</strong></p>`;
}
