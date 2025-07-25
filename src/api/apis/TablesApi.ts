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
  CreateTableDto,
  ErrorResponse,
  TablesGet200Response,
  TablesPost200Response,
} from '../models/index';
import {
    CreateTableDtoFromJSON,
    CreateTableDtoToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    TablesGet200ResponseFromJSON,
    TablesGet200ResponseToJSON,
    TablesPost200ResponseFromJSON,
    TablesPost200ResponseToJSON,
} from '../models/index';

export interface TablesGetRequest {
    userId: number;
    typeId: number;
    monthYear: string;
}

export interface TablesIdGetRequest {
    id: number;
}

export interface TablesPostRequest {
    createTableDto: CreateTableDto;
}

/**
 * 
 */
export class TablesApi extends runtime.BaseAPI {

    /**
     * Get table by parameters
     */
    async tablesGetRaw(requestParameters: TablesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TablesGet200Response>> {
        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling tablesGet().'
            );
        }

        if (requestParameters['typeId'] == null) {
            throw new runtime.RequiredError(
                'typeId',
                'Required parameter "typeId" was null or undefined when calling tablesGet().'
            );
        }

        if (requestParameters['monthYear'] == null) {
            throw new runtime.RequiredError(
                'monthYear',
                'Required parameter "monthYear" was null or undefined when calling tablesGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['userId'] != null) {
            queryParameters['user_id'] = requestParameters['userId'];
        }

        if (requestParameters['typeId'] != null) {
            queryParameters['type_id'] = requestParameters['typeId'];
        }

        if (requestParameters['monthYear'] != null) {
            queryParameters['month_year'] = requestParameters['monthYear'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tables`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TablesGet200ResponseFromJSON(jsonValue));
    }

    /**
     * Get table by parameters
     */
    async tablesGet(requestParameters: TablesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TablesGet200Response> {
        const response = await this.tablesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get table by id
     */
    async tablesIdGetRaw(requestParameters: TablesIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TablesGet200Response>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling tablesIdGet().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tables/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TablesGet200ResponseFromJSON(jsonValue));
    }

    /**
     * Get table by id
     */
    async tablesIdGet(requestParameters: TablesIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TablesGet200Response> {
        const response = await this.tablesIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a new table
     */
    async tablesPostRaw(requestParameters: TablesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TablesPost200Response>> {
        if (requestParameters['createTableDto'] == null) {
            throw new runtime.RequiredError(
                'createTableDto',
                'Required parameter "createTableDto" was null or undefined when calling tablesPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/tables`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateTableDtoToJSON(requestParameters['createTableDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TablesPost200ResponseFromJSON(jsonValue));
    }

    /**
     * Create a new table
     */
    async tablesPost(requestParameters: TablesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TablesPost200Response> {
        const response = await this.tablesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
