// Add event listeners

const tools = {
    selectTool: (tool) => {
        var tools = document.getElementsByClassName('ngatahi-tool');
        for (var i = 0; i < tools.length; i++) {
            if (tools[i].id === tool) {
                tools[i].removeAttribute('hidden');
            } else {
                tools[i].setAttribute('hidden', 'hidden');
            }
        }
    },
    util: {
        input: function (name, description, inputoptions, defaultopt = null) {
            return {
                name: name,
                getheader: (separator = true) => {
                    return `${name}${separator ? "|" : ""}`;
                },
                getrow: () => {
                    var tr = document.createElement("tr");
                    tr.id = name;
                    var tdname = document.createElement("td");
                    tdname.innerHTML = name;
                    tdname.classList.add('model');
                    tr.appendChild(tdname);
                    var tddesc = document.createElement("td");
                    tddesc.innerHTML = description;
                    tddesc.classList.add('model');
                    tr.appendChild(tddesc);
                    for (var i = 0; i <= tools.itemconnector.rowcount; i++) {
                        var tdrow = document.createElement("td");
                        var el = document.createElement('input');
                        el.title = `${name} | ${description}`;
                        el.id = `${name}_${i}`;
                        if (defaultopt) {
                            el.value = defaultopt;
                        }
                        for (var key in inputoptions) {
                            el[key] = inputoptions[key];
                        }
                        if (i == 0) {
                            tdrow.classList.add('model');
                            el.onchange = () => {
                                for (var i = 1; i <= rowcount; i++) {
                                    document.getElementById(`${name}_${i}`).value = document.getElementById(`${name}_0`).value;
                                }
                            }
                        }
                        tdrow.appendChild(el);
                        tr.appendChild(tdrow);
                    }
                    return tr;
                }
            }
        },
        select: function (name, description, inputoptions, options, defaultopt) {
            return {
                name: name,
                getheader: (separator = true) => {
                    return `${name}${separator ? "|" : ""}`;
                },
                getrow: () => {
                    var tr = document.createElement("tr");
                    tr.id = name;
                    var tdname = document.createElement("td");
                    tdname.innerHTML = name;
                    tdname.classList.add('model');
                    tr.appendChild(tdname);
                    var tddesc = document.createElement("td");
                    tddesc.innerHTML = description;
                    tddesc.classList.add('model');
                    tr.appendChild(tddesc);
                    for (var i = 0; i <= tools.itemconnector.rowcount; i++) {
                    var tdrow = document.createElement("td");
                    var el = document.createElement('select');
                    el.id = `${name}_${i}`;
                    for (var key in inputoptions) {
                        el[key] = inputoptions[key];
                    }
                    for (var key in options) {
                        var option = document.createElement('option');
                        option['value'] = key;
                        option.innerHTML = options[key];
                        if (key == defaultopt) {
                            option.setAttribute('selected', 'selected');
                        }
                        el.appendChild(option)
                    }
                    if (i == 0) {
                        tdrow.classList.add('model');
                        el.onchange = () => {
                            for (var i = 1; i <= rowcount; i++) {
                                document.getElementById(`${name}_${i}`).value = document.getElementById(`${name}_0`).value;
                            }
                        }
                    }
                    tdrow.appendChild(el);
                    tr.appendChild(tdrow);
                    }
                    return tr;
                }
            }
        },
    },
    container: document.getElementById('tool-container'),
    oauthconfiguration: {
        platform: document.getElementById('oauthconfiguration-platform'),
        companyId: document.getElementById('oauthconfiguration-companyId'),
        clientId: document.getElementById('oauthconfiguration-clientId'),
        clientSecret: document.getElementById('oauthconfiguration-clientSecret'),
        clientSecretHash: document.getElementById('oauthconfiguration-clientSecretHash'),
        publicKey: document.getElementById('oauthconfiguration-publicKey'),
        save: () => {
            localStorage.setItem('oauthconfiguration', JSON.stringify({
                platform: tools.oauthconfiguration.platform.value,
                companyId: tools.oauthconfiguration.companyId.value,
                clientId: tools.oauthconfiguration.clientId.value,
                clientSecret: tools.oauthconfiguration.clientSecret.value,
                clientSecretHash: tools.oauthconfiguration.clientSecretHash.value,
                publicKey: tools.oauthconfiguration.publicKey.value,
            }))
        },
        load: () => {
            var config = JSON.parse(localStorage.getItem('oauthconfiguration'));
            tools.oauthconfiguration.platform.value = config.platform;
            tools.oauthconfiguration.companyId.value = config.companyId;
            tools.oauthconfiguration.clientId.value = config.clientId;
            tools.oauthconfiguration.clientSecret.value = config.clientSecret;
            tools.oauthconfiguration.clientSecretHash.value = config.clientSecretHash;
            tools.oauthconfiguration.publicKey.value = config.publicKey;
        },
        getToken: () => { }

    },
    itemconnector: {
        rowcount: 20,
        fields: function () {
            return [
            tools.util.input(
                "CPNT_ID",
                "Unique ID",
                {
                    type: "text",
                    maxLength: "30",
                    required: "required"
                }
            ),
            tools.util.input(
                'CPNT_TITLE',
                'Title',
                {
                    type: 'text',
                    maxLength: '100',
                    required: "required"
                }
            ),
            tools.util.input(
                'CPNT_DESC',
                'Item Description (plaintext)',
                {
                    type: 'text',
                    required: "required"
                }
            ),
            tools.util.select(
                'CPNT_TYP_ID',
                'Item type',
                null,
                {
                    101: '101 | Course',
                    102: '102 | Exam',
                    103: "103 | Standard Operating Procedure",
                    104: "104 | Document",
                    105: "105 | Certification",
                    106: "106 | Briefing",
                    107: "107 | On The Job Training",
                    108: "108 | Online Course",
                    109: "109 | External Course",
                    110: "110 | License",
                    120: "120 | Unit Standard",
                },
                '106'
            ),
            tools.util.input(
                'REV_NUM',
                'Revision number',
                {
                    type: 'number',
                    value: '1',
                    min: '1',
                    step: '1'
                }
            ),
            tools.util.input(
                'CPNT_LEN',
                'Length (hours) of first agenda slot',
                {
                    type: 'number',
                    min: "0.25",
                    step: "0.25"
                }
            ),
            tools.util.select(
                'DEL_MTH_ID',
                'Delivery Method',
                null,
                {
                    101: "101 | Classroom with eLearning",
                    102: "102 | Document - Physical",
                    103: "103 | Document - Online",
                    104: "104 | On the Job Training",
                    105: "105 | Video",
                    106: "106 | eLearning",
                    107: "107 | Classroom - Physical",
                    108: "108 | Classroom - Online",
                    109: "109 | Unit Standard",
                },
                106
            ),
            tools.util.select(
                'CPNT_SRC_ID',
                'Learning Source',
                null, 
                {
                    101: "101 | External",
                    102: "102 | Internal",
                },
                102
            ),
            tools.util.input(
                'CREDIT_HRS',
                'Credit Hours',
                {
                    type: 'number',
                    min: '0.25',
                    step: '0.25'
                }
            ),
            tools.util.input(
                'CONTACT_HRS',
                'Contact Hours',
                {
                    type: 'number',
                    min: '0.25',
                    step: '0.25'
                }
            ),
            tools.util.input(
                'CPE_HRS',
                'Continuing Professional Education Hours',
                {
                    type: 'number',
                    min: '0.25',
                    step: '0.25'
                }
            ),
            tools.util.select(
                'LOCALE',
                'Language Locale',
                null,
                {
                    'English': 'English',
                    'English United Kingdom': 'English (United Kingdom)'
                },
                'English United Kingdom'
            ),
            tools.util.input(
                'CONTACT',
                'Contact email',
                {
                    type: 'email'
                }
            ),
            tools.util.select(
                'DMN_ID',
                'Security Domain',
                null,
                {
                    AUTH: 'AUTH',
                    AVSEC: 'AVSEC',
                    CAA: 'CAA',
                    PUBLIC: 'PUBLIC'
                },
                'PUBLIC'
            ),
            tools.util.select(
                'NOTACTIVE',
                'Item is deactivated',
                null,
                {
                    Y: 'Yes',
                    N: 'No'
                },
                'N'
            ),
            tools.util.input(
                'MIN_ENRL',
                'Minimum enrolments',
                {
                    type: 'number',
                    min: '0',
                    step: '1'
                }
            ),
            tools.util.input(
                'MAX_ENRL',
                'Maximum enrolments',
                {
                    type: 'number',
                    min: '0',
                    step: '1'
                }
            ),
            tools.util.select(
                'SELF_ENRL',
                'Allow self registration',
                null,
                {
                    '': 'Use default',
                    'Y': 'Yes',
                    'N': 'No'
                },
                ''
            ),
            tools.util.select(
                'SUPER_ENRL',
                'Allow manager registration',
                null,
                {
                    '': 'Use default',
                    'Y': 'Yes',
                    'N': 'No'
                },
                ''
            ),
            tools.util.select(
                'AUTO_FILL_ENRL',
                'Automatically enroll waitlisted',
                null,
                {
                    '': 'Use default',
                    'Y': 'Yes',
                    'N': 'No'
                },
                ''
            ),
            tools.util.select(
                'USER_CAN_WAITLIST',
                'User can waitlist',
                null,
                {
                    '': 'Use default',
                    'Y': 'Yes',
                    'N': 'No'
                },
                ''
            ),
            tools.util.select(
                'APPROVAL_REQD',
                'Approval to enrol is required',
                null,
                {
                    '': 'Use default',
                    'Y': 'Yes',
                    'N': 'No'
                },
                ''
            ),
            tools.util.select(
                'TAP_DEF_ID',
                'Approval Process',
                null,
                {
                    '': 'Use default',
                    101: '101 | First Level Manager',
                    102: '102 | First and Second Level Manager',
                    103: '103 | Learning Coordinator',
                    104: '104 | Manager and Coordinator'
                },
                ''
            ),
            tools.util.select(
                'WITHDRAW_APPROVAL_REQD',
                'Approval to enrol is required',
                null,
                {
                    '': 'Use default',
                    'Y': 'Yes',
                    'N': 'No'
                },
                ''
            ),
            tools.util.select(
                'WITHDRAW_TAP_DEF_ID',
                'Approval Process',
                null,
                {
                    '': 'Use default',
                    101: '101 | First Level Manager',
                    102: '102 | First and Second Level Manager',
                    103: '103 | Learning Coordinator',
                    104: '104 | Manager and Coordinator'
                },
                ''
            ),
            tools.util.select(
                'ENABLE_RATING',
                'Allow users to rate',
                null,
                {
                    '': 'Use default',
                    'Y': 'Yes',
                    'N': 'No'
                },
                ''
            ),
            tools.util.select(
                'RTYP_ID',
                'Assignment Type',
                null,
                {
                    REC: 'Recommended',
                    REQ: 'Required'
                },
                'REQ'
            ),
            tools.util.input(
                'CREATE_DTE',
                'Date of Item creation',
                {
                    type: 'date'
                },
                new Date().toDateString()
            ),
            tools.util.input(
                'REV_DTE',
                'Date of Item revision',
                {
                    type: 'date'
                }
            ),
            tools.util.input(
                'COMMENTS',
                'Administrator comment',
                {
                    type: 'text',
                    maxLength: '2000'
                }
            ),
            tools.util.input(
                'SUBJ_AREA_1',
                '',
                {
                    type: 'text',
                    maxLength: '30'
                }
            ),
            tools.util.input(
                'SUBJ_AREA_2',
                '',
                {
                    type: 'text',
                    maxLength: '30'
                }
            ),
            tools.util.input(
                'SUBJ_AREA_3',
                '',
                {
                    type: 'text',
                    maxLength: '30'
                }
            ),
            tools.util.select(
                'CUST_OWNER',
                'Content Owner',
                null,
                {
                    '': 'No owner selected',
                    DT: 'DT | Digital Team',
                    HSW: 'HSW | Health, Safety and Wellbeing',
                    OPG: 'OPG | Operational Policy Practice',
                    LSU: 'LSU | Legal',
                    A1: 'A1 | Avsec Training',
                    OD: 'OD | Organisational Development'
                }
            ),
            tools.util.input(
                'CUST_REVIEW',
                'Review Period (months)',
                {
                    type: 'number',
                    min: '1',
                    max: '36',
                    step: '1',
                    value: '12'
                }
            )
        ]},
        endline: '!##!',
        addrow: () => {
            var errors = [];
            for (var i = 1; i <= tools.itemconnector.rowcount; i++) {
                var output = document.getElementById('output');
                var values = [];
                var invalid = false;
                var fields = tools.itemconnector.fields();
                for (var j = 0; j < fields.length; j++) {
                    var input = document.getElementById(`${fields[j].name}_${i}`);
                    var value = input.value;
                    if (input.type == 'date') {
                        value = tools.itemconnector.formatdate(value);
                    }
                    values.push(value);
                    if (input.hasAttribute('required')) {
                        if (!input.value) {
                            errors.push(`Row ${i} is missing required field ${fields[j].name}.`);
                            invalid = true;
                        }
                        input.value = null;
                    }
                }
                if (!invalid) {
                    output.innerHTML += `<br>${values.join('|')}${tools.itemconnector.endline}`;
                }
            }
            if (errors) {
                alert(errors.join('\r\n'));
            }
        },
        formatdate: (date) => {
            var date = date ? new Date(date) : new Date();
            var month = tools.itemconnector.getmonth(date.getMonth());
            var day = String(date.getDate()).padStart(2, 0);
            var year = date.getFullYear();
        
            return `${month}-${day}-${year} 00:00:00`;
            //Sep-05-2023 00:00:00
        },
        getmonth: (month) => {
            var retval;
            switch (month) {
            case 0: {
                retval = "Jan";
                break;
            }
            case 1: {
                retval = "Feb";
                break;
            }
            case 2: {
                retval = "Mar";
                break;
            }
            case 3: {
                retval = "Apr";
                break;
            }
            case 4: {
                retval = "May";
                break;
            }
            case 5: {
                retval = "Jun";
                break;
            }
            case 6: {
                retval = "Jul";
                break;
            }
            case 7: {
                retval = "Aug";
                break;
            }
            case 8: {
                retval = "Sep";
                break;
            }
            case 9: {
                retval = "Oct";
                break;
            }
            case 10: {
                retval = "Nov";
                break;
            }
            case 11: {
                retval = "Dec";
                break;
            }
            }
            return retval;
        },
        build: () => {
            var tableheader = document.getElementById('table-header');
            var output = document.getElementById('output');
            var columns = [];
            var fields = tools.itemconnector.fields();

            for (var i = 1; i <= tools.itemconnector.rowcount; i++) {
                var th = document.createElement('th');
                th.innerHTML = `Row ${i}`;
                tableheader.appendChild(th);
            }

            for (var key in fields) {
                tableheader.parentElement.appendChild(fields[key].getrow());
                columns.push(fields[key].name);
            }

            var buttonrow = `
                <tr>
                    <td colspan="${tools.itemconnector.rowcount + 3}" style="margin: auto">
                        <button class="btn btn-primary my-3" hx-on="click: tools.itemconnector.addrow()"><i class="bi bi-database-add"></i> Append Data</button>
                    </td>
                </tr>
            `;
            tableheader.parentNode.innerHTML += buttonrow;
            output.innerHTML = `${columns.join('|')}${tools.itemconnector.endline}`;
            tools.itemconnector.addlisteners();
        },
        addlisteners: () => {
            var fields = tools.itemconnector.fields();
            for (var key in fields) {
                var id = `${fields[key].name}_0`;
                document.getElementById(id).addEventListener('change', (event) => {
                    for (var i = 1; i <= tools.itemconnector.rowcount; i++) {
                        document.getElementById(event.target.id.replace('_0', '') + `_${i}`).value = event.target.value;
                    }
                })
            }
        },
        download: () => {
            var filename = 'item_data_civilaviatstage.txt';
            var regex = /<br\s*[\/]?>/gi;
            var content = document.getElementById('output').getInnerHTML().replace(regex, "\n");
            var link = document.createElement('a');
            link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content)); 
            link.download = filename;
            link.style.display = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    },
    imsmanifest: {
        getManifest: () => {
            let xmlDoc;
            let txt = document.getElementById('imsmanifest-ims').value;
            
            if (window.DOMParser) {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(txt, "text/xml");
            }
            else { // Internet Explorer
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(txt);
            }
            return xmlDoc;
        },
        parseManifest: () => {
            let xmlDoc = tools.imsmanifest.getManifest();
            
            let files = xmlDoc.getElementsByTagName('file');
            let output = document.getElementById('imsmanifest-output');
            let outputHTML = '';
            let outputCount = 0;
            for (var i = 0; i < files.length; i++) {
              let href = decodeURI(files[i].getAttribute('href'));
              if (href.length > 125) {
                outputCount++
                outputHTML += `<p><span class='overlength'>${href.length} characters</span> ${href}</p>`;
              }
            }
            output.innerHTML = `<h2>File path length check - <span class='overlength'>${outputCount}</span> exceed maximum 125</h2>${outputHTML}`;
            tools.imsmanifest.check2004();
          },
        check2004: () => {
            let xmlDoc;
            let txt = document.getElementById('imsmanifest-ims').value;
            
            if (window.DOMParser) {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(txt, "text/xml");
            }
            else { // Internet Explorer
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(txt);
            }
            
            let schema = xmlDoc.getElementsByTagName('schema');
            if (schema[0].innerHTML == 'ADL SCORM') {
              let navigation = document.getElementById('imsmanifest-navigation');
              navigation.classList = [];
            } else {
              navigation.classList = ['hidden'];
            }
          },
        suppress2004NavigationButtons: () => {
            let xmlDoc = tools.imsmanifest.getManifest();
            
            let manifest = xmlDoc.getElementsByTagName('manifest')[0];
            if (manifest.getAttribute('xmlns:adlnav') == null) {
              xmlDoc.getElementsByTagName('manifest')[0].setAttribute('xmlns:adlnav', 'http://www.adlnet.org/xsd/adlnav_v1p3')
            }
            if (manifest.getAttribute('xsi:schemaLocation') !== null) {
              var schemaLocation = manifest.getAttribute('xsi:schemaLocation');
              xmlDoc.getElementsByTagName('manifest')[0].setAttribute('xsi:schemaLocation', `${schemaLocation} http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd`);
            }
            for (let item of xmlDoc.getElementsByTagName('item')) {
              if (xmlDoc.getElementsByTagName('adlnav:presentation').length == 0) {
                let presentation = xmlDoc.createElement('adlnav:presentation');
                let interface = xmlDoc.createElement('adlnav:navigationInterface');
                ['continue', 'previous', 'exit', 'exitAll', 'suspendAll', 'abandonAll']
                  .map((value, idx) => {
                  let element = xmlDoc.createElement('adlnav:hideLMSUI');
                  element.textContent = value;
                  interface.appendChild(element);
                });
                presentation.appendChild(interface);
                item.appendChild(presentation);
              }
            }
            
            let ims = document.getElementById('imsmanifest-ims');
            ims.value = new XMLSerializer().serializeToString(xmlDoc);
          }
    },
    entityid: {
        process: () => {
            const container = document.getElementById('entityid-result');
            const project = document.getElementById('entityid-project');
            const projectnumber = document.getElementById('entityid-projectnumber');
            const entity = document.getElementById('entityid-entity');
            const entitynumber = document.getElementById('entityid-entitynumber');
            const revision = document.getElementById('entityid-entityrevision');

            switch (entity.value) {
                case "DOC":
                case "AIC":
                case "SCO": {
                    revision.removeAttribute('disabled');
                    console.log('Is content object');
                    break;
                }
                default: {
                    revision.setAttribute('disabled', 'disabled');
                    break;
                }
            }

            // Return early
            if (
                !project.validity.valid ||
                !projectnumber.validity.valid ||
                !entity.validity.valid ||
                !entitynumber.validity.valid 
            ) {
                container.innerHTML = "";
                return false;
            }

            // Process
            var code = `${project.value}${projectnumber.value.padStart(3, '0')}_${entity.value}${entitynumber.value.padStart(2, '0')}${revision.value > 0 ? '.' + revision.value.padStart(2, '0') : ""}`;
            var entitytype = 'item';
            var filter = (row) => { return row.id === code };
            var validateProjectOnly = false;
            switch (entity.value) {
                case "ELN":
                case "INC":
                case "BLN":
                case "OJT":
                case "EXT": {
                    entitytype = 'item';
                    break;
                }
                case "PRS":
                case "PRD":
                case "PRO": {
                    entitytype = 'program';
                    break;
                }
                case "CUR": {
                    entitytype = 'curriculum';
                    break;
                }
                case "CRH":
                case "CRP":
                case "CRI": {
                    // entitytype = 'curriculum';
                    // filter = (row) => { return row.requirementid === code };
                    // break;
                    entitytype = 'item';
                    filter = (row) => { return row.id.indexOf(code.substring(0,6)) >= 0};
                    validateProjectOnly = true;
                    break;
                }
                case "COL": {
                    // entitytype = 'collection';
                    // break;
                    entitytype = 'item';
                    filter = (row) => { return row.id.indexOf(code.substring(0,6)) >= 0};
                    validateProjectOnly = true;
                    break;
                }
                case "ELK": {
                    // entitytype = 'externallink';
                    // break;
                    entitytype = 'item';
                    filter = (row) => { return row.id.indexOf(code.substring(0,6)) >= 0};
                    validateProjectOnly = true;
                    break;
                }
                case "LIB": {
                    // entitytype = 'library';
                    // break;
                    entitytype = 'item';
                    filter = (row) => { return row.id.indexOf(code.substring(0,6)) >= 0};
                    validateProjectOnly = true;
                    break;
                }
                case "GRP": {
                    // entitytype = 'classgroup';
                    // break;
                    entitytype = 'item';
                    filter = (row) => { return row.id.indexOf(code.substring(0,6)) >= 0};
                    validateProjectOnly = true;
                    break;
                }
                case "DOC":
                case "AIC":
                case "SCO": {
                    entitytype = 'contentobject';
                    break;
                }
                case "EXM": {
                    entitytype = 'exam';
                    break;
                }
                case "QUI": {
                    entitytype = 'quiz';
                    break;
                }
                case "QUE": {
                    // entitytype = 'question';
                    // break;
                    entitytype = 'item';
                    filter = (row) => { return row.id.indexOf(code.substring(0,6)) >= 0};
                    validateProjectOnly = true;
                    break;
                }
                case "OBJ": {
                    // entitytype = 'objective';
                    // break;
                    entitytype = 'item';
                    filter = (row) => { return row.id.indexOf(code.substring(0,6)) >= 0};
                    validateProjectOnly = true;
                    break;
                }
                case "TSK": {
                    entitytype = 'task';
                    break;
                }
                case "SUR": {
                    // entitytype = 'survey';
                    // break;
                    entitytype = 'item';
                    filter = (row) => { return row.id.indexOf(code.substring(0,6)) >= 0};
                    validateProjectOnly = true;
                    break;
                }
                case "DLK": {
                    entitytype = 'documentlink';
                    break;
                }
                case "UGP": {
                    // entitytype = 'usergroup';
                    // break;
                    entitytype = 'item';
                    filter = (row) => { return row.id.indexOf(code.substring(0,6)) >= 0};
                    validateProjectOnly = true;
                    break;
                }
                case "COH": {
                    // entitytype = 'cohort';
                    // break;
                    entitytype = 'item';
                    filter = (row) => { return row.id.indexOf(code.substring(0,6)) >= 0};
                    validateProjectOnly = true;
                    break;
                }
                default: {
                    break;
                }
            }
            tools.entityid.availableId(entitytype, filter, (available) => { 
                if (available) {
                        container.innerHTML = `<div class="alert alert-success">Your generated id is <br><code>${code}</code></div>`
                    } else {
                        if (validateProjectOnly) {
                            container.innerHTML = `<div class="alert alert-warning">Project code <code>${code.substring(0,6)}</code> may be in use.</div>`;
                        } else {
                            container.innerHTML = `<div class="alert alert-danger">ID <code>${code}</code> is in use.</div>`;
                        }
                    }
                }
            )
        },
        availableId: (entity, filter, callback) => {
            Papa.parse(`./data/${entity}.csv`, {
                header: true,
                download: true,
                complete: function(results) {
                    callback(!results.data.some(filter));
                }
            });
        }
    }

}

