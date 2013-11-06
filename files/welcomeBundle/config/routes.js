exports.get = {

    'accueil'  : {
       controller : 'accueil',
       action     : 'index',
       pattern    : '/',
       method     : 'GET'
    },

    'done'  : {
       controller : 'configuration',
       action     : 'done',
       pattern    : '/configuration/done',
       method     : 'GET'
    },

    'confProject'     : {
        controller : 'configuration',
        action     : 'project',
        pattern    : '/configuration/project',
        method     : 'GET'
    },

    'confProjectCheck'     : {
        controller : 'configuration',
        action     : 'projectCheck',
        pattern    : '/configuration/project_check',
        method     : 'POST'
    },

    'confSQL'     : {
        controller : 'configuration',
        action     : 'sql',
        pattern    : '/configuration/sql',
        method     : 'GET'
    },

    'confSQLCheck'     : {
        controller : 'configuration',
        action     : 'sqlCheck',
        pattern    : '/configuration/sql_check',
        method     : 'POST'
    },

    'confMail'     : {
        controller : 'configuration',
        action     : 'mail',
        pattern    : '/configuration/mail',
        method     : 'GET'
    },

    'confMailCheck'     : {
        controller : 'configuration',
        action     : 'mailCheck',
        pattern    : '/configuration/mail_check',
        method     : 'POST'
    },

    'tutorial' :{

        controller : 'tutorial',
        action     : 'tutorial',
        pattern    : '/tutorial/:page',
        method     : 'GET'

    },

    'demo' :{

        controller : 'demo',
        action     : 'index',
        pattern    : '/demo',
        method     : 'GET'

    }

};