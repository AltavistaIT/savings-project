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

import { mapValues } from '../runtime';
import type { GetTableResponse } from './GetTableResponse';
import {
    GetTableResponseFromJSON,
    GetTableResponseFromJSONTyped,
    GetTableResponseToJSON,
    GetTableResponseToJSONTyped,
} from './GetTableResponse';

/**
 * 
 * @export
 * @interface TablesGet200Response
 */
export interface TablesGet200Response {
    /**
     * 
     * @type {string}
     * @memberof TablesGet200Response
     */
    message?: string;
    /**
     * 
     * @type {boolean}
     * @memberof TablesGet200Response
     */
    success?: boolean;
    /**
     * 
     * @type {GetTableResponse}
     * @memberof TablesGet200Response
     */
    data?: GetTableResponse;
}

/**
 * Check if a given object implements the TablesGet200Response interface.
 */
export function instanceOfTablesGet200Response(value: object): value is TablesGet200Response {
    return true;
}

export function TablesGet200ResponseFromJSON(json: any): TablesGet200Response {
    return TablesGet200ResponseFromJSONTyped(json, false);
}

export function TablesGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TablesGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'message': json['message'] == null ? undefined : json['message'],
        'success': json['success'] == null ? undefined : json['success'],
        'data': json['data'] == null ? undefined : GetTableResponseFromJSON(json['data']),
    };
}

export function TablesGet200ResponseToJSON(json: any): TablesGet200Response {
    return TablesGet200ResponseToJSONTyped(json, false);
}

export function TablesGet200ResponseToJSONTyped(value?: TablesGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'message': value['message'],
        'success': value['success'],
        'data': GetTableResponseToJSON(value['data']),
    };
}

