import React from 'react';
import getLinkTarget from '../getLinkTarget';

describe('get link target based on current location', () => {
    beforeAll(() => {
        Object.defineProperty(window.location, 'href', {
            writable: true,
            value: 'http://local.example/current/page'
        });
    });

    describe('external link', () => {
        it('use absolute uri for external link', () => {
            const result = getLinkTarget('http://my.example/path/to/resource');
            expect(result.href).toEqual('http://my.example/path/to/resource');
            expect(result.external).toBeTruthy();
        });
    });

    describe('internal link', () => {
        it('absolute path', () => {
            const result = getLinkTarget('http://local.example/other/page');
            expect(result.href).toEqual('/other/page');
            expect(result.external).toBeFalsy();
        });

        it('absolute path with querystring', () => {
            const result = getLinkTarget('http://local.example/other/page?foo=42');
            expect(result.href).toEqual('/other/page?foo=42');
            expect(result.external).toBeFalsy();
        });

        it('absolute path with fragment', () => {
            const result = getLinkTarget('http://local.example/other/page#foo');
            expect(result.href).toEqual('/other/page#foo');
            expect(result.external).toBeFalsy();
        });

        it('absolut path with querystring and fragment', () => {
            const result = getLinkTarget('http://local.example/other/page?foo=42#bar');
            expect(result.href).toEqual('/other/page?foo=42#bar');
            expect(result.external).toBeFalsy();
        });

        it('switch protocol', () => {
            const result = getLinkTarget('https://local.example/secure/page');
            expect(result.href).toEqual('https://local.example/secure/page');
            expect(result.external).toBeTruthy();
        });

        it('relative path', () => {
            const result = getLinkTarget('other/page');
            expect(result.href).toEqual('other/page');
            expect(result.external).toBeFalsy();
        });

        it('absolut path', () => {
            const result = getLinkTarget('/other/page');
            expect(result.href).toEqual('/other/page');
            expect(result.external).toBeFalsy();
        });

    });






});