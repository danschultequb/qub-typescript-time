import * as assert from "assert";

import * as time from "../sources/time";

suite("time", () => {
    suite("MomentDateTime", () => {
        test("toUTC()", () => {
            const clock = new time.RealClock();
            const localDateTime: time.DateTime = clock.getLocalDateTime();
            const utcDateTime: time.DateTime = localDateTime.toUTC();
            assert.deepStrictEqual(utcDateTime.getTimeZoneOffset().asHours(), 0);
        });
    });

    suite("Clock", () => {
        test("getLocalDate()", () => {
            const clock = new time.RealClock();
            const localDate: time.Date = clock.getLocalDate();
            assert(2017 <= localDate.getYear());
            assert(1 <= localDate.getMonth() && localDate.getMonth() <= 12);
            assert(1 <= localDate.getDayOfMonth() && localDate.getDayOfMonth() <= 31);
        });

        test("getLocalTime()", () => {
            const clock = new time.RealClock();
            const localTime: time.Time = clock.getLocalTime();
            assert(0 <= localTime.getHour() && localTime.getHour() <= 23);
            assert(0 <= localTime.getMinute() && localTime.getMinute() <= 59);
            assert(0 <= localTime.getSecond() && localTime.getSecond() <= 59);
            assert(0 <= localTime.getMillisecond() && localTime.getMillisecond() <= 999);
        });

        test("getLocalDateTime()", () => {
            const clock = new time.RealClock();
            const localDateTime: time.DateTime = clock.getLocalDateTime();
            assert(2017 <= localDateTime.getYear());
            assert(1 <= localDateTime.getMonth() && localDateTime.getMonth() <= 12);
            assert(1 <= localDateTime.getDayOfMonth() && localDateTime.getDayOfMonth() <= 31);
            assert(0 <= localDateTime.getHour() && localDateTime.getHour() <= 23);
            assert(0 <= localDateTime.getMinute() && localDateTime.getMinute() <= 59);
            assert(0 <= localDateTime.getSecond() && localDateTime.getSecond() <= 59);
            assert(0 <= localDateTime.getMillisecond() && localDateTime.getMillisecond() <= 999);
        });

        test("getUTCDate()", () => {
            const clock = new time.RealClock();
            const utcDate: time.Date = clock.getUTCDate();
            assert(2017 <= utcDate.getYear());
            assert(1 <= utcDate.getMonth() && utcDate.getMonth() <= 12);
            assert(1 <= utcDate.getDayOfMonth() && utcDate.getDayOfMonth() <= 31);
        });

        test("getUTCTime()", () => {
            const clock = new time.RealClock();
            const utcTime: time.Time = clock.getUTCTime();
            assert(0 <= utcTime.getHour() && utcTime.getHour() <= 23);
            assert(0 <= utcTime.getMinute() && utcTime.getMinute() <= 59);
            assert(0 <= utcTime.getSecond() && utcTime.getSecond() <= 59);
            assert(0 <= utcTime.getMillisecond() && utcTime.getMillisecond() <= 999);
        });

        test("getUTCDateTime()", () => {
            const clock = new time.RealClock();
            const utcDateTime: time.DateTime = clock.getUTCDateTime();
            assert(2017 <= utcDateTime.getYear());
            assert(1 <= utcDateTime.getMonth() && utcDateTime.getMonth() <= 12);
            assert(1 <= utcDateTime.getDayOfMonth() && utcDateTime.getDayOfMonth() <= 31);
            assert(0 <= utcDateTime.getHour() && utcDateTime.getHour() <= 23);
            assert(0 <= utcDateTime.getMinute() && utcDateTime.getMinute() <= 59);
            assert(0 <= utcDateTime.getSecond() && utcDateTime.getSecond() <= 59);
            assert(0 <= utcDateTime.getMillisecond() && utcDateTime.getMillisecond() <= 999);
        });
    });
});