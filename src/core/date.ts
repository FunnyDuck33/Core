/*!
 * V4Fire Core
 * https://github.com/V4Fire/Core
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Core/blob/master/LICENSE
 */

import { lang } from 'core/i18n';

export type DateValue = string | number | Date;
export type DateCreateOptions = sugarjs.Date.DateCreateOptions;

/**
 * Returns a list of week days
 */
Date.getWeekDays = function getWeekDays(): string[] {
	return [t`Mn`, t`Ts`, t`Wd`, t`Th`, t`Fr`, t`St`, t`Sn`];
};

const
	{format: sugarFormat} = Date.prototype,
	formatRgxp = /{(humanTimeDate|humanDate)}/g;

/**
 * Date.format wrapper
 * (added: {humanTimeDate} and {humanDate})
 *
 * @param value
 * @param [locale]
 */
Date.prototype.format = function format(value: string, locale?: string): string {
	const aliases = {
		humanTimeDate: '{HH}:{mm} {humanDate}',
		humanDate: lang === 'ru' ? '{dd}.{MM}.{yyyy}' : '{MM}.{dd}.{yyyy}'
	};

	const replace = (str) => str.replace(formatRgxp, (str, $1) => aliases[$1]);
	return sugarFormat.call(this, replace(value), locale || lang);
};
