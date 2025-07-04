/* tslint:disable */
/* eslint-disable */
/**
 * sp_internal_api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ConfigGet200Response,
} from '../models/index';
import {
    ConfigGet200ResponseFromJSON,
    ConfigGet200ResponseToJSON,
} from '../models/index';

/**
 * 
 */
export class ConfigApi extends runtime.BaseAPI {

    /**
     * Get the configuration of webapp
     */
    async configGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ConfigGet200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/config`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ConfigGet200ResponseFromJSON(jsonValue));
    }

    /**
     * Get the configuration of webapp
     */
    async configGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ConfigGet200Response> {
        const response = await this.configGetRaw(initOverrides);
        return await response.value();
    }

}
