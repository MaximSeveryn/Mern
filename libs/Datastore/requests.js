import BorumJotRequest from "./BorumJotRequest";
import { unescapeSlashes } from "./responseHelpers";

class Datastore {
	constructor(abortController) {
		this.abortController = abortController;
	}
}

export async function submitLogin(email, password) {
	return await BorumJotRequest.initialize(`login`)
		.post(`email=${email}&password=${password}`)
		.makeRequest();
}

export async function getJottingsRaw(abortController = null) {
	const response = await BorumJotRequest.initialize("jottings")
		.authorize()
		.makeRequest(abortController);

	return response ?? response.data;
}

/**
 * Makes GET request
 */
export async function getJottings(abortController = null) {
	if (window) {
		let { data } = await getJottingsRaw(abortController);

		const tasks = data.filter((item) => item.source == "task");
		tasks.forEach((item) => (item.body = unescapeSlashes(item.body)));

		return {
			notes: data.filter((item) => item.source == "note"),
			tasks,
		};
	}

	throw new Error("Window not loaded yet");
}

export async function getSharedJottings(abortController = null) {
	const response = await BorumJotRequest.initialize(`sharedjottings`)
		.authorize()
		.makeRequest(abortController);

		

	if (response.data) {
		response.data.notes = response.data.notes.map((data) => ({
			id: data.note_id,
			title: data.title,
			user_id: data.recipient_id,
			completed: data.completed,
			time_updated: data.time_updated,
			parent_id: 0,
			due_date: data.due_date,
		}));

		response.data.tasks.forEach((item) => (item.body = unescapeSlashes(item.body)));

		return response.data;
	}

	return response;
}

export function getTask(id) {
	const queryString = `id=${id}`;
	return BorumJotRequest.initialize(`task?${queryString}`)
		.authorize();
}

/**
 * Makes GET request to API to get body of the note
 * @param {number} id The id of the note whose body is getting fetched
 * @return {Promise<string>} The body of the note
 */
export async function getBody(id, jotType, abortController) {
	const queryString = `id=${id}`;
	let response = await BorumJotRequest.initialize(`${jotType}?${queryString}`)
		.authorize()
		.makeRequest(abortController);

	const body = await response.data.body;
	const unescapedSlashes = unescapeSlashes(body);

	return unescapedSlashes;
}

export async function updateBody(id, jotType, newBody, abortController) {
	const queryString = `id=${id}`;
	const unescapedBody = newBody ? unescapeSlashes(newBody) : "";

	return BorumJotRequest.initialize(`${jotType}?${queryString}`)
		.authorize()
		.put(`body=${unescapedBody}`)
		.makeRequest(abortController);
}

/**
 * Makes API request to pin a jotting of the given type with the given id
 * @param {object} jottingInfo The jotting info
 * @param {number} jottingInfo.id The id of the jotting
 * @param {string} jottingInfo.jotType The type of the jotting
 * @param {number} jottingInfo.priority The requested new priority of the jotting
 */
export async function pinJotting({ id, jotType, priority }) {
	const queryString = `id=${id}&priority=${priority == 0 ? 1 : 0}`;
	return BorumJotRequest.initialize(`${jotType}?${queryString}`)
		.authorize()
		.put()
		.makeRequest();
}

/**
 * Makes DELETE request to endpoint jotType (dynamic)
 * @precondition jotType is an existing endpoint; userApiKey exists in localStorage
 * @postcondition Request is made and response is returned
 * @param {object} jottingInfo The jotting info
 * @param {number} jottingInfo.id The id of the jotting
 * @param {string} jottingInfo.jotType The type of the jotting
 */
export async function deleteJotting({ id, jotType }) {
	return BorumJotRequest.initialize(`${jotType}`)
		.authorize()
		.delete(`id=${id}`)
		.makeRequest();
}

export async function deleteTask(id) {
	return deleteJotting({ id, jotType: "task" });
}

/**
 * Updates the title of a jotting
 * @param {number} id The id of the jotting
 * @param {string} jotType The type of the jotting
 * @param {string} title The title of the updated jotting
 */
export async function updateJottingTitle(id, jotType, title) {
	const queryString = `id=${id}&name=${title}`;
	return BorumJotRequest.initialize(`${jotType}?${queryString}`)
		.authorize()
		.put()
		.makeRequest();
}

/**
 * Marks a task (or a subtask) as complete or incomplete
 * @param {number} id
 * @param {boolean} completed
 */
export async function updateTaskStatus(id, completed) {
	const queryString = `id=${id}&completed=${completed ? 1 : 0}`;
	return BorumJotRequest.initialize(`task?${queryString}`)
		.authorize()
		.put()
		.makeRequest();
}

/**
 * Makes POST request to create a new jotting
 * @param {string} jotType
 * @param {string} jotName
 */
export async function createJotting(jotType, jotName) {
	const queryString = `${jotType.toLowerCase()}`;
	const response = await BorumJotRequest.initialize(queryString)
		.authorize()
		.post(`name=${jotName}`)
		.makeRequest();

	return response.data ?? response;
}

export async function createLabel(labelName) {
	const response = await BorumJotRequest.initialize(`label`)
		.authorize()
		.post(`name=${labelName}`)
		.makeRequest();

	return response.data ?? response;
}

export async function createSubtask(id, jotName) {
	const response = await BorumJotRequest.initialize(`subtask`)
		.authorize()
		.post(`id=${id}&name=${jotName}`)
		.makeRequest();

	return response.data ?? response;
}

export async function getSubtasks(id) {
	const { data } = await getSubtasksRequest(id).makeRequest();

	return data;
}

export function getSubtasksRequest(id) {
	const queryString = `id=${id}&subsubtasks`;
	return BorumJotRequest.initialize(`subtasks?${queryString}`).authorize();
}

/**
 *
 * @param {number} id id of the note
 * @param {string} recipientEmail Email of the specified recipient
 * @param {string} jotType The type of jotting: note or task; singular and lowercase
 */
export async function shareJot(id, recipientEmail, jotType, abortController) {
	return await BorumJotRequest.initialize(`${jotType}/share`)
		.authorize()
		.post(`id=${id}&email=${recipientEmail}`)
		.makeRequest(abortController);
}

/**
 * Gets the sharees for a jotting
 * @param {number} id id of the jotting
 * @param {AbortController} abortController The abort controller to pass to
 * BorumJotRequest.prototype.makeRequest()
 */
export async function getJotSharees(id, jotType, abortController) {
	const queryString = `id=${id}`;
	const response = await BorumJotRequest.initialize(
		`${jotType}/share?${queryString}`
	)
		.authorize()
		.makeRequest(abortController);

	return response.data ?? response;
}

export async function removeSharee(id, shareeEmail, abortController) {
	return await BorumJotRequest.initialize(`note/share`)
		.authorize()
		.delete(`id=${id}&email=${shareeEmail}`)
		.makeRequest(abortController);
}

export async function getLabels(abortController) {
	const { data } = await BorumJotRequest.initialize(`label`)
		.authorize()
		.makeRequest(abortController);

	return data;
}

export async function getLabel(name, abortController) {
	const { data } = await BorumJotRequest.initialize(`jottings?label=${name}`)
		.authorize()
		.makeRequest(abortController);

	return data;
}
