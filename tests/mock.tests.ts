import * as assert from "assert";

import * as mock from "../sources/mock";
import * as time from "../sources/time";

suite("mock", () => {
    suite("Clock", () => {
        suite("constructor()", () => {
            test("with no argument", () => {
                const clock = new mock.Clock();

                const localDate: time.Date = clock.getLocalDate();
                assert(2017 <= localDate.getYear());
                assert(1 <= localDate.getMonth() && localDate.getMonth() <= 12);
                assert(1 <= localDate.getDayOfMonth() && localDate.getDayOfMonth() <= 31);

                const localTime: time.Time = clock.getLocalTime();
                assert(0 <= localTime.getHour() && localTime.getHour() <= 23);
                assert(0 <= localTime.getMinute() && localTime.getMinute() <= 59);
                assert(0 <= localTime.getSecond() && localTime.getSecond() <= 59);
                assert(0 <= localTime.getMillisecond() && localTime.getMillisecond() <= 999);

                const localDateTime: time.DateTime = clock.getLocalDateTime();
                assert.deepStrictEqual(localDateTime.getYear(), localDate.getYear());
                assert.deepStrictEqual(localDateTime.getMonth(), localDate.getMonth());
                assert.deepStrictEqual(localDateTime.getDayOfMonth(), localDate.getDayOfMonth());
                assert.deepStrictEqual(localDateTime.getHour(), localTime.getHour());
                assert.deepStrictEqual(localDateTime.getMinute(), localTime.getMinute());
                assert.deepStrictEqual(localDateTime.getSecond(), localTime.getSecond());
                assert.deepStrictEqual(localDateTime.getMillisecond(), localTime.getMillisecond());

                const utcDate: time.Date = clock.getUTCDate();
                assert.deepStrictEqual(utcDate.getYear(), localDate.getYear());
                assert.deepStrictEqual(utcDate.getMonth(), localDate.getMonth());
                assert.deepStrictEqual(utcDate.getDayOfMonth(), localDate.getDayOfMonth());

                const utcTime: time.Time = clock.getUTCTime();
                assert.deepStrictEqual(utcTime.getHour(), localTime.getHour());
                assert.deepStrictEqual(utcTime.getMinute(), localTime.getMinute());
                assert.deepStrictEqual(utcTime.getSecond(), localTime.getSecond());
                assert.deepStrictEqual(utcTime.getMillisecond(), localTime.getMillisecond());

                const utcDateTime: time.DateTime = clock.getUTCDateTime();
                assert.deepStrictEqual(utcDateTime.getYear(), localDate.getYear());
                assert.deepStrictEqual(utcDateTime.getMonth(), localDate.getMonth());
                assert.deepStrictEqual(utcDateTime.getDayOfMonth(), localDate.getDayOfMonth());
                assert.deepStrictEqual(utcDateTime.getHour(), localTime.getHour());
                assert.deepStrictEqual(utcDateTime.getMinute(), localTime.getMinute());
                assert.deepStrictEqual(utcDateTime.getSecond(), localTime.getSecond());
                assert.deepStrictEqual(utcDateTime.getMillisecond(), localTime.getMillisecond());
            });

            test("with DateTime", () => {
                const clock = new mock.Clock(time.dateTimeFrom({
                    year: 1,
                    month: 2,
                    dayOfMonth: 3,
                    hour: 4,
                    minute: 5,
                    second: 6,
                    millisecond: 7
                }));

                const localDate: time.Date = clock.getLocalDate();
                assert.deepStrictEqual(localDate.getYear(), 1);
                assert.deepStrictEqual(localDate.getMonth(), 2);
                assert.deepStrictEqual(localDate.getDayOfMonth(), 3);

                const localTime: time.Time = clock.getLocalTime();
                assert.deepStrictEqual(localTime.getHour(), 4);
                assert.deepStrictEqual(localTime.getMinute(), 5);
                assert.deepStrictEqual(localTime.getSecond(), 6);
                assert.deepStrictEqual(localTime.getMillisecond(), 7);

                const localDateTime: time.DateTime = clock.getLocalDateTime();
                assert.deepStrictEqual(localDateTime.getYear(), 1);
                assert.deepStrictEqual(localDateTime.getMonth(), 2);
                assert.deepStrictEqual(localDateTime.getDayOfMonth(), 3);
                assert.deepStrictEqual(localDateTime.getHour(), 4);
                assert.deepStrictEqual(localDateTime.getMinute(), 5);
                assert.deepStrictEqual(localDateTime.getSecond(), 6);
                assert.deepStrictEqual(localDateTime.getMillisecond(), 7);

                const utcDate: time.Date = clock.getUTCDate();
                assert.deepStrictEqual(utcDate.getYear(), localDate.getYear());
                assert.deepStrictEqual(utcDate.getMonth(), localDate.getMonth());
                assert.deepStrictEqual(utcDate.getDayOfMonth(), localDate.getDayOfMonth());

                const utcTime: time.Time = clock.getUTCTime();
                assert.deepStrictEqual(utcTime.getHour(), localTime.getHour());
                assert.deepStrictEqual(utcTime.getMinute(), localTime.getMinute());
                assert.deepStrictEqual(utcTime.getSecond(), localTime.getSecond());
                assert.deepStrictEqual(utcTime.getMillisecond(), localTime.getMillisecond());

                const utcDateTime: time.DateTime = clock.getUTCDateTime();
                assert.deepStrictEqual(utcDateTime.getYear(), 1);
                assert.deepStrictEqual(utcDateTime.getMonth(), 2);
                assert.deepStrictEqual(utcDateTime.getDayOfMonth(), 3);
                assert.deepStrictEqual(utcDateTime.getHour(), 12);
                assert.deepStrictEqual(utcDateTime.getMinute(), 5);
                assert.deepStrictEqual(utcDateTime.getSecond(), 6);
                assert.deepStrictEqual(utcDateTime.getMillisecond(), 7);
            });
        });

        test("setLocalDateTime()", () => {
            const clock = new mock.Clock(time.dateTimeFrom({
                year: 1,
                month: 2,
                dayOfMonth: 3,
                hour: 4,
                minute: 5,
                second: 6,
                millisecond: 7
            }));

            clock.setLocalDateTime(time.dateTimeFrom({
                year: 8,
                month: 9,
                dayOfMonth: 10,
                hour: 11,
                minute: 12,
                second: 13,
                millisecond: 14
            }));

            const localDateTime: time.DateTime = clock.getLocalDateTime();
            assert.deepStrictEqual(localDateTime.getYear(), 8);
            assert.deepStrictEqual(localDateTime.getMonth(), 9);
            assert.deepStrictEqual(localDateTime.getDayOfMonth(), 10);
            assert.deepStrictEqual(localDateTime.getHour(), 11);
            assert.deepStrictEqual(localDateTime.getMinute(), 12);
            assert.deepStrictEqual(localDateTime.getSecond(), 13);
            assert.deepStrictEqual(localDateTime.getMillisecond(), 14);
        });

        test("advance()", () => {
            const clock = new mock.Clock(time.dateTimeFrom({
                year: 1,
                month: 2,
                dayOfMonth: 3,
                hour: 4,
                minute: 5,
                second: 6,
                millisecond: 7
            }));

            clock.advance(time.durationFrom({
                hours: 1,
                minutes: 2,
                seconds: 3,
                milliseconds: 4
            }));

            const localDateTime: time.DateTime = clock.getLocalDateTime();
            assert.deepStrictEqual(localDateTime.getYear(), 1);
            assert.deepStrictEqual(localDateTime.getMonth(), 2);
            assert.deepStrictEqual(localDateTime.getDayOfMonth(), 3);
            assert.deepStrictEqual(localDateTime.getHour(), 5);
            assert.deepStrictEqual(localDateTime.getMinute(), 7);
            assert.deepStrictEqual(localDateTime.getSecond(), 9);
            assert.deepStrictEqual(localDateTime.getMillisecond(), 11);
        });
    });
});