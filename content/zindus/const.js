/* ***** BEGIN LICENSE BLOCK *****
 * 
 * "The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 * 
 * The Original Code is Zindus Sync.
 * 
 * The Initial Developer of the Original Code is Toolware Pty Ltd.
 *
 * Portions created by Initial Developer are Copyright (C) 2007
 * the Initial Developer. All Rights Reserved.
 * 
 * Contributor(s): Leni Mayo
 * 
 * ***** END LICENSE BLOCK *****/

const APP_NAME="zindus";
const APP_VERSION_NUMBER="0.6.19.20080408.070802";                      // this line generated by build.sh
const APP_VERSION_DATA_CONSISTENT_WITH="0.6.19.20080402.090733";       // remove the data files (forcing a slow sync) if data was
                                                                       // generated by a software version older than this

const SHOW_STATUS_PANEL_IN = [ 'folderPaneBox', 'addressbookWindow' ]; // the status + progress panels are visibile and updated
                                                                       // in windows containing these ids.

const ZM_ID_FOLDER_TRASH         = 3;             // For the ZM_* constants, see: ZimbraServer/src/java/com/zimbra/cs/mailbox/Mailbox.java
const ZM_ID_FOLDER_CONTACTS      = 7;
const ZM_ID_FOLDER_AUTO_CONTACTS = 13;

const ZM_FOLDER_CONTACTS         = "Contacts";
const ZM_FOLDER_EMAILED_CONTACTS = "Emailed Contacts";

const GD_FOLDER_CONTACTS         = "zindus_pab_gd";

const ZM_PERM_NONE     = 0x00;
const ZM_PERM_READ     = 0x01;
const ZM_PERM_WRITE    = 0x02;

const TBCARD_ATTRIBUTE_LUID     = "zindus-id";    // user-defined attributes associated with thunderbird cards
const TBCARD_ATTRIBUTE_CHECKSUM = "zindus-cs";

const TB_PAB              = "zindus_pab";
const TB_EMAILED_CONTACTS = "zindus_emailed_contacts";

const SOURCEID_TB = 1;
const SOURCEID_ZM = 2;
const SOURCEID_GD = 3;

const FORMAT_TB = 1;
const FORMAT_ZM = 2;
const FORMAT_GD = 3;

const A_VALID_FORMATS =  [ FORMAT_TB, FORMAT_ZM, FORMAT_GD ];

const HTTP_STATUS_200_OK = 200;
const HTTP_STATUS_ON_SERVICE_FAILURE = -12345;
const HTTP_STATUS_ON_CANCEL          = -12346;
