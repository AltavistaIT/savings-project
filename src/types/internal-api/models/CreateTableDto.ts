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
 * @interface CreateTableDto
 */
export interface CreateTableDto {
    /**
     * 
     * @type {number}
     * @memberof CreateTableDto
     */
    user_id: number;
    /**
     * 
     * @type {number}
     * @memberof CreateTableDto
     */
    type_id: number;
    /**
     * 
     * @type {string}
     * @memberof CreateTableDto
     */
    month_year: string;
}

/**
 * Check if a given object implements the CreateTableDto interface.
 */
export function instanceOfCreateTableDto(value: object): value is CreateTableDto {
    if (!('user_id' in value) || value['user_id'] === undefined) return false;
    if (!('type_id' in value) || value['type_id'] === undefined) return false;
    if (!('month_year' in value) || value['month_year'] === undefined) return false;
    return true;
}

export function CreateTableDtoFromJSON(json: any): CreateTableDto {
    return CreateTableDtoFromJSONTyped(json, false);
}

export function CreateTableDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateTableDto {
    if (json == null) {
        return json;
    }
    return {
        
        'user_id': json['user_id'],
        'type_id': json['type_id'],
        'month_year': json['month_year'],
    };
}

export function CreateTableDtoToJSON(json: any): CreateTableDto {
    return CreateTableDtoToJSONTyped(json, false);
}

export function CreateTableDtoToJSONTyped(value?: CreateTableDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'user_id': value['user_id'],
        'type_id': value['type_id'],
        'month_year': value['month_year'],
    };
}

