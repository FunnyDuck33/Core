/*!
 * V4Fire Core
 * https://github.com/V4Fire/Core
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Core/blob/master/LICENSE
 */

import { LogPipelineConfig } from 'core/log/config/types';
import { LogPipeline } from 'core/log/curator/pipeline';
import { DEFAULT_LEVEL } from 'core/log/base';

import middlewareFactory, { LogMiddleware } from 'core/log/middlewares';
import engineFactory from 'core/log/engines';

/**
 * Creates a pipeline using config
 * (returns undefined if there are not enough data to create one)
 *
 * @param pipelineConfig
 */
export function createPipeline(pipelineConfig: LogPipelineConfig): CanUndef<LogPipeline> {
	const
		{middlewares, engine, engineOptions, minLevel} = pipelineConfig;

	if (middlewares) {
		for (let i = 0; i < middlewares.length; ++i) {
			if (!middlewareFactory[middlewares[i]]) {
				console.error(`Can't find middleware '${middlewares[i]}'`);
				return;
			}
		}
	}

	if (!engineFactory[engine]) {
		console.error(`Can't find engine '${engine}'`);
		return;
	}

	const
		engineInstance = engineFactory[engine](engineOptions),
		middlewareInstances: LogMiddleware[] = [];

	if (middlewares) {
		for (let i = 0; i < middlewares.length; ++i) {
			middlewareInstances.push(middlewareFactory[middlewares[i]]());
		}
	}

	return new LogPipeline(engineInstance, middlewareInstances, minLevel || DEFAULT_LEVEL);
}
