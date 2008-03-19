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

include("chrome://zindus/content/utils.js");

function SyncFsmExitStatus()
{
	this.m_exit_status      = null;
	this.m_fail_code        = null; // one of the Fail* codes
	this.m_fail_detail      = null;
	this.m_fail_soapmethod  = null;
	this.m_fail_fsmoldstate = null;
	this.m_count_conflicts  = 0;

	this.m_a_valid_code = {
		FailOnService                 : { 'folder' : 0 }, // 1.  some sort of service failure (generated by mozilla)
		FailOnFault                   : { 'folder' : 0 }, // 2.  recieved a soap fault
		FailOnMismatchedResponse      : { 'folder' : 0 }, // 3.  sent BlahRequest and received FooResponse (expected BlahResponse)
		FailOnCancel                  : { 'folder' : 0 }, // 4.  user cancelled
		FailOnIntegrityBadCredentials : { 'folder' : 0 }, // 5.  something dodgy about url, username or password - dont proceed
		FailOnIntegrityDataStoreIn    : { 'folder' : 0 }, // 6.  something dodgy about the data store that just got loaded
		FailOnIntegrityDataStoreOut   : { 'folder' : 0 }, // 7.  internal error - we've created a data store that's dodgy
		FailOnUnknown                 : { 'folder' : 0 }, // 8.  this should never be!
		FailOnFolderNameDuplicate     : { 'folder' : 1 }, // 9.
		FailOnFolderNameReserved      : { 'folder' : 1 }, // 10.
		FailOnFolderNameInvalid       : { 'folder' : 1 }, // 11.
		FailOnFolderMustBePresent     : { 'folder' : 1 }, // 12.
		FailOnFolderReservedChanged   : { 'folder' : 1 }, // 13.
		FailOnFolderNameClash         : { 'folder' : 1 }, // 14. the same folder name entered the namespace from both tb and zm sides
		FailOnFolderSourceUpdate      : { 'folder' : 1 }, // 15. the source update operations can't be applied with confidence
		FailOnFolderCantCreateShared  : { 'folder' : 1 }, // 16. 
		FailOnUnableToUpdateZm        : { 'folder' : 0 }, // 17. soap response in UpdateZm had an unexpected element - assume that it failed
		FailOnNoXpath                 : { 'folder' : 0 }  // 18. 
	};
}

SyncFsmExitStatus.prototype.stringBundleString = stringBundleString;

SyncFsmExitStatus.prototype.toString = function()
{
	var ret = "";
	
	ret += "exit_status: " + this.m_exit_status;

	if (this.m_exit_status)
	{
		ret += " fail_code: "        + this.failcode();
		ret += " fail_detail: "      + this.m_fail_detail;
		ret += " fail_fsmoldstate: " + this.m_fail_fsmoldstate;
	}

	ret += " count_conflicts: " + this.m_count_conflicts;

	return ret;
}

SyncFsmExitStatus.prototype.failCodeStringId = function()
{
	var stringid = "status" + this.failcode();

	return stringid;
}

SyncFsmExitStatus.prototype.failcode = function()
{
	if (arguments.length == 1)
	{
		this.m_fail_code = arguments[0];
		zinAssertAndLog(isPropertyPresent(this.m_a_valid_code, this.m_fail_code), "unmatched code: " + this.m_fail_code);
	}

	return this.m_fail_code;
}

SyncFsmExitStatus.prototype.isFolder = function()
{
	return this.m_a_valid_code[this.failcode()]['folder'] == 1;
}

SyncFsmExitStatus.asMessage = function(context, sbsSuccess, sbsFailure)
{
	var msg = "";

	// if the dialog was cancelled while we were syncing, string bundles wont be available, so we try/catch...
	//
	try {
		if (context.m_exit_status == 0)
			msg += stringBundleString(sbsSuccess);
		else
		{
			msg += stringBundleString(sbsFailure);
			msg += "\n" + stringBundleString(context.failCodeStringId());

			if (context.failcode() == 'FailOnFault')
			{
				msg += "\n" + context.m_fail_detail;
				msg += "\n" + stringBundleString("statusFailSoapMethod") + " " + context.m_fail_soapmethod;
			}
			else if (context.failcode() == 'FailOnCancel')
				msg += "\n" + stringBundleString("statusFailOnCancelDetail");
			else if (context.failcode() == 'FailOnService')
				msg += "\n" + stringBundleString("statusFailOnServiceDetail");
			else if (context.failcode() == 'FailOnUnableToUpdateZm')
				msg += "\n" + context.m_fail_detail;
			else if (context.isFolder())
				msg += ": " + context.m_fail_detail;  // add the name of the offending folder
		}
	} catch (ex) {
		dump("asMessage: exception: " + ex.message + "\n");
		newZinLogger("SyncFsmExitStatus").debug("asMessage: exception: " + ex.message);
	}

	return msg;
}

