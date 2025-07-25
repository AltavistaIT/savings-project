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
/**
 * 
 * @export
 * @interface GetTableModel
 */
export interface GetTableModel {
    /**
     * 
     * @type {number}
     * @memberof GetTableModel
     */
    id?: number;
}

/**
 * Check if a given object implements the GetTableModel interface.
 */
export function instanceOfGetTableModel(value: object): value is GetTableModel {
    return true;
}

export function GetTableModelFromJSON(json: any): GetTableModel {
    return GetTableModelFromJSONTyped(json, false);
}

export function GetTableModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetTableModel {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
    };
}

export function GetTableModelToJSON(json: any): GetTableModel {
    return GetTableModelToJSONTyped(json, false);
}

export function GetTableModelToJSONTyped(value?: GetTableModel | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
    };
}

