/*!
 * V4Fire Core
 * https://github.com/V4Fire/Core
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Core/blob/master/LICENSE
 */

import $C = require('collection.js');
import { lang } from 'core/i18n';

/**
 * Returns a date range by the specified parameters
 *
 * @param from
 * @param [to]
 */
export function getDateRange(from: string | number | Date, to: string | number | Date = from): Date[] {
	return [
		Date.create(from).beginningOfDay(),
		Date.create(to).endOfDay()
	];
}

type DateCreateOptions = sugarjs.Date.DateCreateOptions;

/**
 * Normalizes the specified value as date
 *
 * @param value
 * @param [params] - additional parameters for Date.create
 */
export function normalizeIfDate(value: any, params?: DateCreateOptions): Date | undefined;

/**
 * @param value - list of values
 * @param [params] - additional parameters for Date.create
 */
export function normalizeIfDate(value: any[], params?: DateCreateOptions): Date[];
export function normalizeIfDate(value: any | any[], params?: DateCreateOptions): Date | Date[] | undefined {
	if (Object.isArray(value)) {
		return $C(<any[]>value).map((date) => Date.create(date, params));
	}

	return value ? Date.create(value, params) : undefined;
}

/**
 * Returns date value from the specified string
 *
 * @param str
 * @param [separator] - separator pattern
 * @param [params] - additional parameters for Date.create
 */
export function getDateFromStr(str: string, separator: RegExp = /\/|-|\.|\s+/, params?: DateCreateOptions): Date {
	const p = str.split(separator);
	return Date.create(lang === 'ru' ? [p[1], p[0], p[2]].join('.') : str, params);
}
