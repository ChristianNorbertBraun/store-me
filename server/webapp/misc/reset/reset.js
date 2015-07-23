/**
 * Created by captainluma on 13.07.15.
 */

$.couch.urlPrefix = strings.link.dbConnection;

var tableNames = ["storemeattributes", "storemecategory", "storemecontainer", "storemeitems", "storemelog", "storemeusers"];
var reset = [ false, false, false, false, false, false, false, false, false ];

var resetTables = function()
{
    reset[0] = $('#cbAttributes').get()[0].checked;
    reset[1] = $('#cbCategories').get()[0].checked;
    reset[2] = $('#cbContainers').get()[0].checked;
    reset[3] = $('#cbItems').get()[0].checked;
    reset[4] = $('#cbLog').get()[0].checked;
    reset[5] = $('#cbUsers').get()[0].checked;
    reset[6] = $('#cbFHWS').get()[0].checked;
    reset[7] = $('#cbSubNet').get()[0].checked;
    reset[8] = $('#cbDefault').get()[0].checked;



    for ( var i = 0; i < tableNames.length; i++ )
    {
        if ( reset[i] )
        {
            dropDatabase( tableNames[i] );
            createDatabase( tableNames[i] );
        }
    }
    if ( reset[6] )
    {
        resetFHWS();
    }
    if ( reset[7] )
    {
        resetSubNet();
    }
    if ( reset[8] )
    {
        resetDefaultScript()
    }
};

var dropDatabase = function( tableName )
{
    $.couch.db( tableName ).drop(
        {
            success: function ( data )
            {
                console.log( data );
            },
            error: function ( status )
            {
                console.log( status );
            }
        });
};

var createDatabase = function( tableName )
{
    $.couch.db( tableName ).create(
        {
            success: function( data )
            {
                console.log( data );
            },
            error: function( status )
            {
                console.log( status );
            }
        });
};

var fhws =
{
    "_id"
        :
        "FHWS",
    "_rev"
        :
        "230-4656be5c208a3bb04ac11b57c4a007bb",
    "containerID"
        :
        "0",
    "containerName"
        :
        "FHWS",
    "attributes"
        :
        [],
    "subContainers"
        :
        [
            {
                "containerID": "0-0",
                "containerName": "Hörsaalgebäude",
                "attributes": [],
                "subContainers": [
                    {
                        "containerID": "0-0-0",
                        "containerName": "Ebene 0",
                        "attributes": [],
                        "subContainers": [
                            {
                                "containerID": "0-0-0-0",
                                "containerName": "H.0.1",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Lager",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-0-1",
                                "containerName": "H.0.2",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-0-2",
                                "containerName": "H.0.3",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-0-3",
                                "containerName": "H.0.4",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-0-4",
                                "containerName": "H.0.5",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Lager",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-0-5",
                                "containerName": "H.0.7",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-0-6",
                                "containerName": "H.0.8",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "WC Herren",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-0-7",
                                "containerName": "H.0.10",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "WC Behinderte",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-0-8",
                                "containerName": "H.0.11",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "WC Damen",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-0-9",
                                "containerName": "Cafeteria",
                                "attributes": [],
                                "subContainers": [],
                                "items": []
                            }
                        ],
                        "items": []
                    },
                    {
                        "containerID": "0-0-1",
                        "containerName": "Ebene 1",
                        "attributes": [],
                        "subContainers": [
                            {
                                "containerID": "0-0-1-0",
                                "containerName": "H.1.1",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Hörsaal",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Größe",
                                        "value": "270",
                                        "unit": "Plätze",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-1-1",
                                "containerName": "H.1.2",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Hörsaal",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Größe",
                                        "value": "100",
                                        "unit": "Plätze",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-1-2",
                                "containerName": "H.1.3",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Hörsaal",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Größe",
                                        "value": "100",
                                        "unit": "Plätze",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-1-3",
                                "containerName": "H.1.5",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Hörsaal",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Größe",
                                        "value": "80",
                                        "unit": "Plätze",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-1-4",
                                "containerName": "H.1.6",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Hörsaal",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Größe",
                                        "value": "80",
                                        "unit": "Plätze",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-1-5",
                                "containerName": "H.1.7",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Hörsaal",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Größe",
                                        "value": "80",
                                        "unit": "Plätze",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-0-1-6",
                                "containerName": "H.1.11",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "PC-Pool",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Ausstattung",
                                        "value": "50",
                                        "unit": "Sun-Clients",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            }
                        ],
                        "items": []
                    }
                ],
                "items": []
            },
            {
                "containerID": "0-1",
                "containerName": "Institutsgebäude",
                "attributes": [],
                "subContainers": [
                    {
                        "containerID": "0-1-0",
                        "containerName": "Ebene 0",
                        "attributes": [],
                        "subContainers": [
                            {
                                "containerID": "0-1-0-0",
                                "containerName": "I.0.1",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-1",
                                "containerName": "I.0.2",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Lager",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-2",
                                "containerName": "I.0.3",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-3",
                                "containerName": "I.0.4",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-4",
                                "containerName": "I.0.6",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-5",
                                "containerName": "I.0.7",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-6",
                                "containerName": "I.0.8",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Ausleihe Fotografie",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-7",
                                "containerName": "I.0.9",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Ausleihe Fotografie",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-8",
                                "containerName": "I.0.11",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Ausleihe Film",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-9",
                                "containerName": "I.0.14",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Reproraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-10",
                                "containerName": "I.0.17",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Fotostudio",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-11",
                                "containerName": "I.0.21",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Bibliothek",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-12",
                                "containerName": "I.0.22",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-13",
                                "containerName": "I.0.24",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Regieraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-14",
                                "containerName": "I.0.26",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-15",
                                "containerName": "I.0.29",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-16",
                                "containerName": "I.0.30",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-17",
                                "containerName": "I.0.31",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "WC Herren",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-18",
                                "containerName": "I.0.33",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-19",
                                "containerName": "I.0.34",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Digitaldruck",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-20",
                                "containerName": "I.0.35",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Laserwerkstatt",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-21",
                                "containerName": "I.0.36",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Papierwerkstatt",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-22",
                                "containerName": "I.0.37",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Modellbauwerkstatt",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-23",
                                "containerName": "I.0.38",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-24",
                                "containerName": "I.0.39",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Erste Hilfe",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-25",
                                "containerName": "I.0.40",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technischer Betrieb",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-26",
                                "containerName": "I.0.41",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-0-27",
                                "containerName": "I.0.45",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Lager",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            }
                        ],
                        "items": []
                    },
                    {
                        "containerID": "0-1-1",
                        "containerName": "Ebene 1",
                        "attributes": [],
                        "subContainers": [
                            {
                                "containerID": "0-1-1-0",
                                "containerName": "I.1.1",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Fachschaft",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-1",
                                "containerName": "I.1.2",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-2",
                                "containerName": "I.1.3",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-3",
                                "containerName": "I.1.4",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-4",
                                "containerName": "I.1.6",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-5",
                                "containerName": "I.1.7",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-6",
                                "containerName": "I.1.8",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-7",
                                "containerName": "I.1.9",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-8",
                                "containerName": "I.1.10",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-9",
                                "containerName": "I.1.11",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-10",
                                "containerName": "I.1.12",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-11",
                                "containerName": "I.1.13",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-12",
                                "containerName": "I.1.14",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-13",
                                "containerName": "I.1.15",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-14",
                                "containerName": "I.1.16",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-15",
                                "containerName": "I.1.17",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-16",
                                "containerName": "I.1.18",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-17",
                                "containerName": "I.1.19",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-18",
                                "containerName": "I.1.20",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-19",
                                "containerName": "I.1.23",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-20",
                                "containerName": "I.1.25",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Offenes Atelier",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-21",
                                "containerName": "I.1.26",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Offenes Atelier",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-22",
                                "containerName": "I.1.29",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Dekanat",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-23",
                                "containerName": "I.1.30",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-24",
                                "containerName": "I.1.32",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-25",
                                "containerName": "I.1.33",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-26",
                                "containerName": "I.1.34",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-27",
                                "containerName": "I.1.35",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Wickelraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-28",
                                "containerName": "I.1.36",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "WC Damen",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-29",
                                "containerName": "I.1.38",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Archiv",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-30",
                                "containerName": "I.1.39",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-31",
                                "containerName": "I.1.40",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-32",
                                "containerName": "I.1.41",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-33",
                                "containerName": "I.1.42",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-34",
                                "containerName": "I.1.44",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Teeküche",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-35",
                                "containerName": "I.1.45",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Sekretäriat",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-36",
                                "containerName": "I.1.46",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Sekretäriat",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-37",
                                "containerName": "I.1.47",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Sekretäriat",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-1-38",
                                "containerName": "I.1.48",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            }
                        ],
                        "items": []
                    },
                    {
                        "containerID": "0-1-2",
                        "containerName": "Ebene 2",
                        "attributes": [],
                        "subContainers": [
                            {
                                "containerID": "0-1-2-0",
                                "containerName": "I.2.1",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "PC-Pool",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Ausstattung",
                                        "value": "20",
                                        "unit": "Sun-Clients",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-1",
                                "containerName": "I.2.2",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Studier- und Projektraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-2",
                                "containerName": "I.2.3",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "MEDIA.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-3",
                                "containerName": "I.2.4",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-4",
                                "containerName": "I.2.6",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": " Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "Net.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-5",
                                "containerName": "I.2.7",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "Net.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-6",
                                "containerName": "I.2.8",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "App.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "AUT.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "HARD.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-7",
                                "containerName": "I.2.9",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "App.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "AUT.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "HARD.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-8",
                                "containerName": "I.2.10",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "App.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "AUT.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "HARD.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-9",
                                "containerName": "I.2.11",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Bibliothek",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-10",
                                "containerName": "I.2.13",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Lager",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-11",
                                "containerName": "I.2.14",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-12",
                                "containerName": "I.2.15",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-13",
                                "containerName": "I.2.15a",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "PC-Pool",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Ausstattung",
                                        "value": "20",
                                        "unit": "Sun-Clients",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-14",
                                "containerName": "I.2.16",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-15",
                                "containerName": "I.2.18",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "PC-Pool",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Ausstattung",
                                        "value": "40",
                                        "unit": "Sun-Clients",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-16",
                                "containerName": "I.2.20",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Fakultät",
                                        "value": "FANG",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-17",
                                "containerName": "I.2.21",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "ITSC Service Point",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-18",
                                "containerName": "I.2.22",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Druckerraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-20",
                                "containerName": "I.2.24",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-19",
                                "containerName": "I.2.25",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-21",
                                "containerName": "I.2.26",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "WC Herren",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-22",
                                "containerName": "I.2.28",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-23",
                                "containerName": "I.2.29",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-24",
                                "containerName": "I.2.30",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-25",
                                "containerName": "I.2.31",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-26",
                                "containerName": "I.2.32",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-27",
                                "containerName": "I.2.33",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-28",
                                "containerName": "I.2.34",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-29",
                                "containerName": "I.2.35",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-30",
                                "containerName": "I.2.36",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Teeküche",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-31",
                                "containerName": "I.2.37",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-32",
                                "containerName": "I.2.38",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Interaction & Design Center",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Institut",
                                        "value": "IDIS",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-33",
                                "containerName": "I.2.39",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-34",
                                "containerName": "I.2.42",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Switchboard",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Institut",
                                        "value": "IDIS",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-2-35",
                                "containerName": "I.2.43",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Entwicklung und Verwaltung",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Typ",
                                        "value": "Institut",
                                        "unit": "IDIS",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            }
                        ],
                        "items": []
                    },
                    {
                        "containerID": "0-1-3",
                        "containerName": "Ebene 3",
                        "attributes": [],
                        "subContainers": [
                            {
                                "containerID": "0-1-3-0",
                                "containerName": "I.3.1",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Konferenzraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-1",
                                "containerName": "I.3.2",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-2",
                                "containerName": "I.3.3",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "cloud.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-3",
                                "containerName": "I.3.5",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "BIX.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-4",
                                "containerName": "I.3.6",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "BIX.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-5",
                                "containerName": "I.3.7",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "CU.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-6",
                                "containerName": "I.3.8",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "CU.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-7",
                                "containerName": "I.3.9",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-8",
                                "containerName": "I.3.11",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "WM.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-9",
                                "containerName": "I.3.12",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "social.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-10",
                                "containerName": "I.3.13",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "mobi.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-11",
                                "containerName": "I.3.14",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "mobi.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-12",
                                "containerName": "I.3.15",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Studier- und Projektraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-13",
                                "containerName": "I.3.16",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-14",
                                "containerName": "I.3.18",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Lager",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Spitzname",
                                        "value": "Tutorenraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-15",
                                "containerName": "I.3.19",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-16",
                                "containerName": "I.3.20",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-17",
                                "containerName": "I.3.21",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-18",
                                "containerName": "I.3.22",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-19",
                                "containerName": "I.3.24",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Seminarraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-20",
                                "containerName": "I.3.25",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Konferenzraum",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-21",
                                "containerName": "I.3.26",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-22",
                                "containerName": "I.3.27",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-23",
                                "containerName": "I.3.29",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-24",
                                "containerName": "I.3.30",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-25",
                                "containerName": "I.3.31",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-26",
                                "containerName": "I.3.32",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "WC Behinderte",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-27",
                                "containerName": "I.3.33",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "WC Damen",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-28",
                                "containerName": "I.3.35",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-29",
                                "containerName": "I.3.36",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-30",
                                "containerName": "I.3.37",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-31",
                                "containerName": "I.3.39",
                                "attributes": [
                                    {
                                        "attributeName": "Warnung",
                                        "value": "Dies ist kein Eingang!",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-32",
                                "containerName": "I.3.40",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Teeküche",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-33",
                                "containerName": "I.3.41",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-34",
                                "containerName": "I.3.42",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Büro",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-35",
                                "containerName": "I.3.43",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Technik",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            },
                            {
                                "containerID": "0-1-3-36",
                                "containerName": "I.3.46",
                                "attributes": [
                                    {
                                        "attributeName": "Typ",
                                        "value": "Labor",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    },
                                    {
                                        "attributeName": "Bezeichnung",
                                        "value": "SAP.lab",
                                        "unit": "",
                                        "type": "",
                                        "compulsory": false
                                    }
                                ],
                                "subContainers": [],
                                "items": []
                            }
                        ],
                        "items": []
                    }
                ],
                "items": []
            },
            {
                "containerID": "0-2",
                "containerName": "Tiefgarage",
                "attributes": [
                    {
                        "attributeName": "Parkplatzsituation",
                        "value": "kritisch",
                        "unit": "",
                        "type": "",
                        "compulsory": false
                    }
                ],
                "subContainers": [],
                "items": []
            }
        ],
    "items"
        :
        []
};

var resetFHWS = function()
{
    $.couch.db( tableNames[2] ).saveDoc( fhws,
        {
            success: function( data )
            {
                console.log( data );
            },
            error: function( status )
            {
                console.log( status );
            }
        });
};

function resetSubNet(){
    //coreData

    categoryAdd("Device", function (hallo, hallo2){
    });
    categoryAdd("Router/Switch", function (hallo, hallo2){
    });

    var item1 = new Item("1", "Catalyst 3500 Router", "Router/Switch", []);
    var item1Attr1 = new ItemAttribute("IP", "192.168.0.1/26", null, "String");
    var item1Attr2 = new ItemAttribute("Hersteller", "Cisco", null, "String");
    var item1Attr3 = new ItemAttribute("Portanzahl", "48", null, "Number");
    addItemAttribute(item1, item1Attr1);
    addItemAttribute(item1, item1Attr2);
    addItemAttribute(item1, item1Attr3);

    var item2 = new Item("2", "Linksys WRT54G WLAN Router", "Router/Switch", []);
    var item2Attr1 = new ItemAttribute("IP", "192.168.0.65/26", null, "String");
    var item2Attr2 = new ItemAttribute("Hersteller", "Cisco", null, "String");
    var item2Attr3 = new ItemAttribute("Portanzahl", "4", null, "Number");
    addItemAttribute(item2, item2Attr1);
    addItemAttribute(item2, item2Attr2);
    addItemAttribute(item2, item2Attr3);

    var item3 = new Item("3", "TL-WR841N WLAN Router", "Router/Switch", []);
    var item3Attr1 = new ItemAttribute("IP", "192.168.0.129/26", null, "String");
    var item3Attr2 = new ItemAttribute("Hersteller", "TP-Link", null, "String");
    var item3Attr3 = new ItemAttribute("Portanzahl", "4", null, "Number");
    addItemAttribute(item3, item3Attr1);
    addItemAttribute(item3, item3Attr2);
    addItemAttribute(item3, item3Attr3);

    var item4 = new Item("4", "Catalyst 3500 Router", "Router/Switch", []);
    var item4Attr1 = new ItemAttribute("IP", "192.168.0.193/26", null, "String");
    var item4Attr2 = new ItemAttribute("Hersteller", "Cisco", null, "String");
    var item4Attr3 = new ItemAttribute("Portanzahl", "48", null, "Number");
    addItemAttribute(item4, item4Attr1);
    addItemAttribute(item4, item4Attr2);
    addItemAttribute(item4, item4Attr3);

    var item5 = new Item("5", "Small Buisness 500 Series Switch SG500X-48-K9-G5", "Router/Switch", []);
    var item5Attr1 = new ItemAttribute("Hersteller", "Cisco", null, "String");
    var item5Attr2 = new ItemAttribute("Ports", "48", null, "Number");
    var item5Attr3 = new ItemAttribute("Managed", "True", null, "Boolean");
    var item5Attr4 = new ItemAttribute("Stackable", "True", null, "Boolean");
    addItemAttribute(item5, item5Attr1);
    addItemAttribute(item5, item5Attr2);
    addItemAttribute(item5, item5Attr3);
    addItemAttribute(item5, item5Attr4);

    var item6 = new Item("6", "Computer", "Device", []);
    var item6Attr1 = new ItemAttribute("Prozessor", "i3-3220", "CPU", "String");
    var item6Attr2 = new ItemAttribute("Festplatte", "WD Green 500", "HDD", "String");
    var item6Attr3 = new ItemAttribute("Arbeitsspeicher", "4 GB PC 12800", "RAM", "String");
    var item6Attr4 = new ItemAttribute("Mainboard", "SI H81M-P33", "MB", "String");
    var item6Attr5 = new ItemAttribute("Grafikkarte", "Saphire Radeon R7 250 Ultimate", "GPU", "String");
    var item6Attr6 = new ItemAttribute("Netzteil", "be quiet! Straight Power E9 400W", "PSU", "String");

    addItemAttribute(item6, item6Attr1);
    addItemAttribute(item6, item6Attr2);
    addItemAttribute(item6, item6Attr3);
    addItemAttribute(item6, item6Attr4);
    addItemAttribute(item6, item6Attr5);
    addItemAttribute(item6, item6Attr6);

    addItemToDB(item1, function (hallo, hallo2){
    });
    addItemToDB(item2, function (hallo, hallo2){
    });
    addItemToDB(item3, function (hallo, hallo2){
    });
    addItemToDB(item4, function (hallo, hallo2){
    });
    addItemToDB(item5, function (hallo, hallo2){
    });
    addItemToDB(item6, function (hallo, hallo2){
    });


    //Container Structure

    var initStoreHere = function() {
        var IPNet = new Container("192.168.0.0/26");

        var subnet0 = new Container("192.168.0.0");
        var subnet1 = new Container("192.168.0.64");
        var subnet2 = new Container("192.168.0.128");
        var subnet3 = new Container("192.168.0.192");

        addSubContainer(IPNet, subnet0);
        addSubContainer(IPNet, subnet1);
        addSubContainer(IPNet, subnet2);
        addSubContainer(IPNet, subnet3);

        var attr1 = new ContainerAttribute("Netzmaske", "255.255.255.192", "bits", null, true);

        var attrSubnet0 = new ContainerAttribute("BroadcastID", "192.168.0.63", "IP", null, true);
        var attrSubnet1 = new ContainerAttribute("BroadcastID", "192.168.0.127", "IP", null, true);
        var attrSubnet2 = new ContainerAttribute("BroadcastID", "192.168.0.191", "IP", null, true);
        var attrSubnet3 = new ContainerAttribute("BroadcastID", "192.168.0.255", "IP", null, true);

        var attr2Subnet0 = new ContainerAttribute("Abteilung", "IT", "Abt.", null, true);
        var attr2Subnet1 = new ContainerAttribute("Abteilung", "Finanzen", "Abt.", null, true);
        var attr2Subnet2 = new ContainerAttribute("Abteilung", "HR", "Abt.", null, true);
        var attr2Subnet3 = new ContainerAttribute("Abteilung", "Entwicklung", "Abt.", null, true);

        addContainerAttribute(subnet0, attr1);
        addContainerAttribute(subnet1, attr1);
        addContainerAttribute(subnet2, attr1);
        addContainerAttribute(subnet3, attr1);

        addContainerAttribute(subnet0, attrSubnet0);
        addContainerAttribute(subnet1, attrSubnet1);
        addContainerAttribute(subnet2, attrSubnet2);
        addContainerAttribute(subnet3, attrSubnet3);

        addContainerAttribute(subnet0, attr2Subnet0);
        addContainerAttribute(subnet1, attr2Subnet1);
        addContainerAttribute(subnet2, attr2Subnet2);
        addContainerAttribute(subnet3, attr2Subnet3);

        addItem(subnet0, "1", 1);
        addItem(subnet0, "6", 20);
        addItem(subnet1, "2", 1);
        addItem(subnet1, "5", 1);
        addItem(subnet1, "6", 30);
        addItem(subnet2, "3", 1);
        addItem(subnet2, "5", 1);
        addItem(subnet2, "6", 45);
        addItem(subnet3, "4", 1);
        addItem(subnet3, "5", 1);
        addItem(subnet3, "6", 5);

        return IPNet;
    };
    var createStoreIP = function () {
        try {
            var store = initStoreHere();
            saveStore(function (created) {
                if (created) {
                    console.log("is created");
                } else {
                    console.log("could not create");
                }
            }, store);
        } catch (err) {
            console.log(err);
        }
    };

//store items

    createStoreIP();
}

function resetDefaultScript(){
    var table = {
        "_id": "Mein Lager",
        "_rev": "11-5599b6cc159f098738efc8d7dde9208e",
        "containerID": "0",
        "containerName": "Mein Lager",
        "attributes": [
        ],
        "subContainers": [
            {
                "containerID": "0-0",
                "containerName": "Regal 0",
                "subContainers": [
                    {
                        "containerID": "0-0-0",
                        "containerName": "Box 0",
                        "subContainers": [
                        ],
                        "items": [
                        ]
                    },
                    {
                        "containerID": "0-0-1",
                        "containerName": "Box 1",
                        "subContainers": [
                        ],
                        "items": [
                        ]
                    },
                    {
                        "containerID": "0-0-2",
                        "containerName": "Box 2",
                        "subContainers": [
                        ],
                        "items": [
                        ]
                    },
                    {
                        "containerID": "0-0-3",
                        "containerName": "Box 3",
                        "subContainers": [
                        ],
                        "items": [
                        ]
                    }
                ],
                "items": [
                ]
            },
            {
                "containerID": "0-1",
                "containerName": "Regal 1",
                "subContainers": [
                    {
                        "containerID": "0-1-0",
                        "containerName": "Box 0",
                        "subContainers": [
                        ],
                        "items": [
                        ]
                    },
                    {
                        "containerID": "0-1-1",
                        "containerName": "Box 1",
                        "subContainers": [
                        ],
                        "items": [
                        ]
                    },
                    {
                        "containerID": "0-1-2",
                        "containerName": "Box 2",
                        "subContainers": [
                        ],
                        "items": [
                            {
                                "itemID": "3",
                                "amount": 1,
                                "parentContainerID": "0-1-2"
                            }
                        ]
                    },
                    {
                        "containerID": "0-1-3",
                        "containerName": "Box 3",
                        "subContainers": [
                        ],
                        "items": [
                        ]
                    }
                ],
                "items": [
                ]
            },
            {
                "containerID": "0-2",
                "containerName": "Regal 2",
                "subContainers": [
                    {
                        "containerID": "0-2-0",
                        "containerName": "Box 0",
                        "subContainers": [
                        ],
                        "items": [
                            {
                                "itemID": "0",
                                "amount": 1,
                                "parentContainerID": "0-2-0"
                            }
                        ]
                    },
                    {
                        "containerID": "0-2-1",
                        "containerName": "Box 1",
                        "subContainers": [
                        ],
                        "items": [
                        ]
                    },
                    {
                        "containerID": "0-2-2",
                        "containerName": "Box 2",
                        "subContainers": [
                        ],
                        "items": [
                            {
                                "itemID": "1",
                                "amount": 1,
                                "parentContainerID": "0-2-2"
                            }
                        ]
                    }
                ],
                "items": [
                ]
            }
        ],
        "items": [
        ]
    };
    var item1 = {
        "_id": "0",
        "_rev": "1-07e8fbc59b405b27215b60e036c49fd0",
        "category_id": "Büroutensilien",
        "attributes": [
            {
                "attributeName": "Anzahl",
                "value": "5",
                "unit": "Stück",
                "type": "Number"
            },
            {
                "attributeName": "Farbe",
                "value": "blau",
                "unit": "Farbe",
                "type": "String"
            }
        ],
        "name": "Edding Patronen"
    };
    var item2 = {
        "_id": "1",
        "_rev": "1-83d96f2e4aaf754e32a1e560220cc039",
        "category_id": "Büroutensilien",
        "attributes": [
        ],
        "name": "Tacker"
    };
    var item3 = {
        "_id": "10",
        "_rev": "1-6882dc6836b12dd905f775fb54d50355",
        "category_id": "Flyer",
        "attributes": null,
        "name": "Informatik 2015"
    };
    var item4 = {
        "_id": "11",
        "_rev": "1-0da24667daabd8a344d7002d829ef265",
        "category_id": "FHWS",
        "attributes": [
            {
                "attributeName": "Größe",
                "value": "A4",
                "unit": "DIN",
                "type": "String"
            }
        ],
        "name": "Deckblatt Praktikantenamt"
    };
    var item5 = {
        "_id": "12",
        "_rev": "1-a4677b3ef376397c23f30eef273716f7",
        "category_id": "FHWS",
        "attributes": [
            {
                "attributeName": "Jahr",
                "value": "SS15",
                "unit": "Datum",
                "type": "String"
            }
        ],
        "name": "Klausur BT"
    };
    var item6 = {
        "_id": "13",
        "_rev": "1-cb3d6d11d07dad914efea10773bcd1b6",
        "category_id": "",
        "attributes": [
        ],
        "name": "Spezi Dose"
    };
    var item7 = {
        "_id": "14",
        "_rev": "1-a39aedbc128a444df95b48ae2812ebea",
        "category_id": "",
        "attributes": null,
        "name": "Platik Becher"
    };
    var item8 = {
        "_id": "15",
        "_rev": "1-ee40223a50e893794fe544eb00abf454",
        "category_id": "",
        "attributes": [
            {
                "attributeName": "Marke",
                "value": "kokett",
                "unit": "",
                "type": "String"
            }
        ],
        "name": "Taschentücher"
    };
    var item9 = {
        "_id": "2",
        "_rev": "1-c2358066fa20dcc8ec2d9a69c1c91b3c",
        "category_id": "Büroutensilien",
        "attributes": [
        ],
        "name": "UHU flinke flasche"
    };
    var item10 = {
        "_id": "3",
        "_rev": "1-ff8b2a75928b94f734b037c913b20519",
        "category_id": "Büroutensilien",
        "attributes": [
            {
                "attributeName": "Anzahl",
                "value": "1000",
                "unit": "Stück",
                "type": "Number"
            },
            {
                "attributeName": "Typ",
                "value": "26/6",
                "unit": "Maß",
                "type": "Number"
            }
        ],
        "name": "Heftklammern"
    };
    var item11 = {
        "_id": "4",
        "_rev": "1-73ef81d30b389ee9833f92f539299363",
        "category_id": "Büroutensilien",
        "attributes": [
            {
                "attributeName": "Farbe",
                "value": "rot",
                "unit": "Farbe",
                "type": "String"
            }
        ],
        "name": "Heftstreifen"
    };
    var item12 = {
        "_id": "5",
        "_rev": "1-dfd3b0a41ae182baceabbfdef27ca92c",
        "category_id": "Büroutensilien",
        "attributes": [
        ],
        "name": "Klebeband"
    };
    var item13 = {
        "_id": "6",
        "_rev": "1-aaf5d8840efcdaa02abdf4ed299bd1cc",
        "category_id": "Büroutensilien",
        "attributes": [
            {
                "attributeName": "Fenster",
                "value": "true",
                "unit": "",
                "type": "Boolean"
            }
        ],
        "name": "Briefumschlag"
    };
    var item14 = {
        "_id": "7",
        "_rev": "1-e5d0684a51ff34e9690c6cba11ddd05f",
        "category_id": "Büroutensilien",
        "attributes": null,
        "name": "Klarsichthüllen"
    };
    var item15 = {
        "_id": "8",
        "_rev": "1-43b10583520a3a02a94db2e68b6bf94f",
        "category_id": "Flyer",
        "attributes": [
            {
                "attributeName": "Größe",
                "value": "Postkarte",
                "unit": "",
                "type": "String"
            }
        ],
        "name": "BestStudentChallenge"
    };
    var item16 = {
        "_id": "9",
        "_rev": "1-4de7e8973348b17bee0e896db3322d67",
        "category_id": "Flyer",
        "attributes": [
        ],
        "name": "WingTsun"
    };
    var category1 = {
        "_id": "Büroutensilien",
        "_rev": "1-967a00dff5e02add41819138abb3284d"
    };
    var category2 = {
        "_id": "FHWS",
        "_rev": "1-967a00dff5e02add41819138abb3284d"
    };
    var category3 = {
        "_id": "Flyer",
        "_rev": "1-967a00dff5e02add41819138abb3284d"
    };

    var createDefaultTable = function (store) {
        try {
            saveStore(function (created) {
                if (created) {
                    console.log("is created");
                } else {
                    console.log("could not create");
                }
            }, store);
        } catch (err) {
            console.log(err);
        }
    };


    var saveCategory = function(callBackFunction, category){
        $.couch.urlPrefix = strings.link.dbConnection;

            $.couch.db(strings.database.category).saveDoc(category, {

                success: function (data) {
                    callBackFunction(true);
                },
                error: function (status) {
                    console.log(status);
                    callBackFunction(false);
                }
            });
    };

    var createCa = function (cat) {
        try {
            saveCategory(function (created) {
                if (created) {
                    console.log("is created");
                } else {
                    console.log("could not create");
                }
            }, cat);
        } catch (err) {
            console.log(err);
        }
    };

    createDefaultTable(table);
    createCa(category1);
    createCa(category2);
    createCa(category3);
    addItemToDB(item1, function(hello, hello2){});
    addItemToDB(item2, function(hello, hello2){});
    addItemToDB(item3, function(hello, hello2){});
    addItemToDB(item4, function(hello, hello2){});
    addItemToDB(item5, function(hello, hello2){});
    addItemToDB(item6, function(hello, hello2){});
    addItemToDB(item7, function(hello, hello2){});
    addItemToDB(item8, function(hello, hello2){});
    addItemToDB(item9, function(hello, hello2){});
    addItemToDB(item10, function(hello, hello2){});
    addItemToDB(item11, function(hello, hello2){});
    addItemToDB(item12, function(hello, hello2){});
    addItemToDB(item13, function(hello, hello2){});
    addItemToDB(item14, function(hello, hello2){});
    addItemToDB(item15, function(hello, hello2){});
    addItemToDB(item16, function(hello, hello2){});

}