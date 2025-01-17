/*!
 * V4Fire Core
 * https://github.com/V4Fire/Core
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Core/blob/master/LICENSE
 */

const
	xmlSerializer = new XMLSerializer(),
	normalizeRgxp = /"|(\s+)|[{}\|\\\^~\[\]`"<>#%]/g;

/**
 * Converts the specified node to a data:uri string
 * @param node
 */
export function toDataURI(node: Node): string {
	return `data:image/svg+xml,${xmlSerializer.serializeToString(node).replace(normalizeRgxp, normalize)}`;
}

/**
 * Normalize helper
 */
function normalize(str: string, sp?: string): string {
	if (str === '"') {
		return "'";
	}

	if (sp) {
		return ' ';
	}

	return `%${str[0].charCodeAt(0).toString(16).toUpperCase()}`;
}
