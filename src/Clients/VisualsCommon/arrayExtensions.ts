﻿/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved. 
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *   
 *  The above copyright notice and this permission notice shall be included in 
 *  all copies or substantial portions of the Software.
 *   
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module jsCommon {
    export interface ArrayIdItems<T> extends Array<T> {
        withId(id: number): T;
    }

    export interface ArrayNamedItems<T> extends Array<T> {
        withName(name: string): T;
    }

    export module ArrayExtensions {
        /**
         * Returns items that exist in target and other.
         */
        export function intersect<T>(target: T[], other: T[]): T[] {
            let result: T[] = [];
            for (let i = target.length - 1; i >= 0; --i) {
                if (other.indexOf(target[i]) !== -1) {
                    result.push(target[i]);
                }
            }
            return result;
        }

        /**
         * Return elements exists in target but not exists in other.
         */
        export function diff<T>(target: T[], other: T[]): T[] {
            let result: T[] = [];
            for (let i = target.length - 1; i >= 0; --i) {
                let value: T = target[i];
                if (other.indexOf(value) === -1) {
                    result.push(value);
                }
            }
            return result;
        }

        /** 
         * Return an array with only the distinct items in the source. 
         */
        export function distinct<T>(source: T[]): T[] {
            let result: T[] = [];
            for (let i = 0, len = source.length; i < len; i++) {
                let value: T = source[i];
                if (result.indexOf(value) === -1) {
                    result.push(value);
                }
            }
            return result;
        }
        
        /**
         * Pushes content of source onto target,
         * for parts of course that do not already exist in target.
         */
        export function union<T>(target: T[], source: T[]): void {
            for (let i = 0, len = source.length; i < len; ++i) {
                unionSingle(target, source[i]);
            }
        }

        /**
         * Pushes value onto target, if value does not already exist in target.
         */
        export function unionSingle<T>(target: T[], value: T): void {
            if (target.indexOf(value) < 0) {
                target.push(value);
            }
        }
        
        /**
         * Returns an array with a range of items from source,
         * including the startIndex & endIndex.
         */
        export function range<T>(source: T[], startIndex: number, endIndex: number): T[] {
            debug.assert(startIndex >= 0 && startIndex < source.length, 'startIndex is out of range.');
            debug.assert(endIndex >= 0 && endIndex < source.length, 'endIndex is out of range.');

            let result: T[] = [];
            for (let i = startIndex; i <= endIndex; ++i) {
                result.push(source[i]);
            }
            return result;
        }

        /**
         * Returns an array that includes items from source, up to the specified count.
         */
        export function take<T>(source: T[], count: number): T[] {
            debug.assert(count >= 0, 'Count is negative.');
            debug.assert(count <= source.length, 'Count is too large.');

            let result: T[] = [];
            for (let i = 0; i < count; ++i) {
                result.push(source[i]);
            }
            return result;
        }

        export function copy<T>(source: T[]): T[] {
            debug.assertValue(source, 'source');

            return take(source, source.length);
        }

        /**
         * Returns a value indicating whether the arrays have the same values in the same sequence.
         */
        export function sequenceEqual<T>(left: T[], right: T[], comparison: (x: T, y: T) => boolean): boolean {
            debug.assertValue(comparison, 'comparison');

            if (left === right) {
                return true;
            }

            if (!!left !== !!right) {
                return false;
            }

            let len = left.length;
            if (len !== right.length) {
                return false;
            }

            let i = 0;
            while (i < len && comparison(left[i], right[i])) {
                ++i;
            }

            return i === len;
        }

        /**
         * Returns null if the specified array is empty.  
         * Otherwise returns the specified array.
         */
        export function emptyToNull<T>(array: T[]): T[] {
            if (array && array.length === 0) {
                return null;
            }
            return array;
        }

        export function indexOf<T>(array: T[], predicate: (T) => boolean): number {
            debug.assertValue(array, 'array');
            debug.assertValue(predicate, 'predicate');

            for (let i = 0, len = array.length; i < len; ++i) {
                if (predicate(array[i])) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * Returns a copy of the array rotated by the specified offset.
         */
        export function rotate<T>(array: T[], offset: number): T[] {
            if (offset === 0)
                return array.slice();

            let rotated = array.slice(offset);
            Array.prototype.push.apply(rotated, array.slice(0, offset));

            return rotated;
        }

        export function createWithId<T>(): ArrayIdItems<T> {
            return extendWithId<T>([]);
        }

        export function extendWithId<T>(array: { id: number }[]): ArrayIdItems<T> {
            debug.assertValue(array, 'array');

            let extended: ArrayIdItems<T> = <any>array;
            extended.withId = withId;

            return extended;
        }

        /**
         * Finds and returns the first item with a matching ID.
         */
        export function findWithId<T>(array: T[], id: number): T {
            for (let i = 0, len = array.length; i < len; i++) {
                let item = array[i];
                if ((<any>item).id === id)
                    return item;
            }
        }

        function withId<T>(id: number): T {
            return ArrayExtensions.findWithId<T>(this, id);
        }

        export function createWithName<T>(): ArrayNamedItems<T> {
            return extendWithName<T>([]);
        }

        export function extendWithName<T>(array: { name: string }[]): ArrayNamedItems<T> {
            debug.assertValue(array, 'array');

            let extended: ArrayNamedItems<T> = <any>array;
            extended.withName = withName;

            return extended;
        }

        export function findItemWithName<T>(array: T[], name: string): T {
            let index = indexWithName(array, name);
            if (index >= 0)
                return array[index];
        }

        export function indexWithName<T>(array: T[], name: string): number {
            for (let i = 0, len = array.length; i < len; i++) {
                let item = array[i];
                if ((<any>item).name === name)
                    return i;
            }

            return -1;
        }

        /**
         * Inserts a number in sorted order into a list of numbers already in sorted order.
         * @returns True if the item was added, false if it already existed.
         */
        export function insertSorted(list: number[], value: number): boolean {
            debug.assertValue(list, 'list');
            debug.assertValue(value, 'value');

            let len = list.length;

            // NOTE: iterate backwards because incoming values tend to be sorted already.
            for (let i = len - 1; i >= 0; i--) {
                let diff = list[i] - value;

                if (diff === 0)
                    return false;

                if (diff > 0)
                    continue;

                // diff < 0
                list.splice(i + 1, 0, value);
                return true;
            }

            list.unshift(value);
            return true;
        }

        /**
         * Removes the first occurrence of a value from a list if it exists.
         * @returns True if the value was removed, false if it did not exist in the list.
         */
        export function removeFirst<T>(list: T[], value: T): boolean {
            let index = list.indexOf(value);
            if (index < 0)
                return false;

            list.splice(index, 1);

            return true;
        }

        /**
         * Finds and returns the first item with a matching name.
         */
        function withName<T>(name: string): T {
            let array: T[] = this;
            return findItemWithName(array, name);
        }

        /**
         * Deletes all items from the array.
         */
        export function clear(array: any[]): void {
            if (!array)
                return;

            while (array.length > 0)
                array.pop();
        }

        export function isUndefinedOrEmpty(array: any[]): boolean {
            if (!array || array.length === 0) {
                return true;
            }
            return false;
        }

        export function swap<T>(array: T[], firstIndex: number, secondIndex: number): void {
            let temp = array[firstIndex];
            array[firstIndex] = array[secondIndex];
            array[secondIndex] = temp;
        }

        export function isInArray<T>(array: T[], lookupItem: T, compareCallback: (item1: T, item2: T) => boolean): boolean {
            return _.any(array, item => compareCallback(item, lookupItem));
        }
    }
} 