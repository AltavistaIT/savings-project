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
  CreateTransactionDto,
  ErrorResponse,
  TransactionsIdDelete200Response,
  TransactionsPost200Response,
  UpdateTransactionDto,
} from '../models/index';
import {
    CreateTransactionDtoFromJSON,
    CreateTransactionDtoToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
    TransactionsIdDelete200ResponseFromJSON,
    TransactionsIdDelete200ResponseToJSON,
    TransactionsPost200ResponseFromJSON,
    TransactionsPost200ResponseToJSON,
    UpdateTransactionDtoFromJSON,
    UpdateTransactionDtoToJSON,
} from '../models/index';

export interface TransactionsIdDeleteRequest {
    id: number;
}

export interface TransactionsIdPatchRequest {
    id: number;
    updateTransactionDto: UpdateTransactionDto;
}

export interface TransactionsPostRequest {
    createTransactionDto: CreateTransactionDto;
}

/**
 * 
 */
export class TransactionsApi extends runtime.BaseAPI {

    /**
     * Delete a transaction
     */
    async transactionsIdDeleteRaw(requestParameters: TransactionsIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TransactionsIdDelete200Response>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling transactionsIdDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/transactions/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionsIdDelete200ResponseFromJSON(jsonValue));
    }

    /**
     * Delete a transaction
     */
    async transactionsIdDelete(requestParameters: TransactionsIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TransactionsIdDelete200Response> {
        const response = await this.transactionsIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a transaction
     */
    async transactionsIdPatchRaw(requestParameters: TransactionsIdPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TransactionsPost200Response>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling transactionsIdPatch().'
            );
        }

        if (requestParameters['updateTransactionDto'] == null) {
            throw new runtime.RequiredError(
                'updateTransactionDto',
                'Required parameter "updateTransactionDto" was null or undefined when calling transactionsIdPatch().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/transactions/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateTransactionDtoToJSON(requestParameters['updateTransactionDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionsPost200ResponseFromJSON(jsonValue));
    }

    /**
     * Update a transaction
     */
    async transactionsIdPatch(requestParameters: TransactionsIdPatchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TransactionsPost200Response> {
        const response = await this.transactionsIdPatchRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Create a new transaction
     */
    async transactionsPostRaw(requestParameters: TransactionsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TransactionsPost200Response>> {
        if (requestParameters['createTransactionDto'] == null) {
            throw new runtime.RequiredError(
                'createTransactionDto',
                'Required parameter "createTransactionDto" was null or undefined when calling transactionsPost().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/transactions`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateTransactionDtoToJSON(requestParameters['createTransactionDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionsPost200ResponseFromJSON(jsonValue));
    }

    /**
     * Create a new transaction
     */
    async transactionsPost(requestParameters: TransactionsPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TransactionsPost200Response> {
        const response = await this.transactionsPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
