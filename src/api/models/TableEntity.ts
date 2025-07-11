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
 * @interface TableEntity
 */
export interface TableEntity {
    /**
     * 
     * @type {number}
     * @memberof TableEntity
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TableEntity
     */
    user_id?: number;
    /**
     * 
     * @type {number}
     * @memberof TableEntity
     */
    type_id?: number;
    /**
     * 
     * @type {number}
     * @memberof TableEntity
     */
    amount?: number;
    /**
     * 
     * @type {boolean}
     * @memberof TableEntity
     */
    status?: boolean;
    /**
     * 
     * @type {string}
     * @memberof TableEntity
     */
    month_year?: string;
    /**
     * 
     * @type {string}
     * @memberof TableEntity
     */
    created_at?: string;
    /**
     * 
     * @type {string}
     * @memberof TableEntity
     */
    updated_at?: string;
}

/**
 * Check if a given object implements the TableEntity interface.
 */
export function instanceOfTableEntity(value: object): value is TableEntity {
    return true;
}

export function TableEntityFromJSON(json: any): TableEntity {
    return TableEntityFromJSONTyped(json, false);
}

export function TableEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): TableEntity {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'user_id': json['user_id'] == null ? undefined : json['user_id'],
        'type_id': json['type_id'] == null ? undefined : json['type_id'],
        'amount': json['amount'] == null ? undefined : json['amount'],
        'status': json['status'] == null ? undefined : json['status'],
        'month_year': json['month_year'] == null ? undefined : json['month_year'],
        'created_at': json['created_at'] == null ? undefined : json['created_at'],
        'updated_at': json['updated_at'] == null ? undefined : json['updated_at'],
    };
}

export function TableEntityToJSON(json: any): TableEntity {
    return TableEntityToJSONTyped(json, false);
}

export function TableEntityToJSONTyped(value?: TableEntity | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'user_id': value['user_id'],
        'type_id': value['type_id'],
        'amount': value['amount'],
        'status': value['status'],
        'month_year': value['month_year'],
        'created_at': value['created_at'],
        'updated_at': value['updated_at'],
    };
}

