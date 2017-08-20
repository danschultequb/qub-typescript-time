import * as assert from "assert";

import * as time from "../sources/time";

suite("time", () => {
    suite("durationFromDays()", () => {
        function durationFromDaysTest(days: number): void {
            test(`with ${days}`, () => {
                const duration: time.Duration = time.durationFromDays(days);
                assert.deepStrictEqual(duration.asDays(), days);
            });
        }

        durationFromDaysTest(-5);
        durationFromDaysTest(-1.1);
        durationFromDaysTest(0);
        durationFromDaysTest(1.7);
        durationFromDaysTest(100);
    });

    suite("durationFromHours()", () => {
        function durationFromHoursTest(hours: number): void {
            test(`with ${hours}`, () => {
                const duration: time.Duration = time.durationFromHours(hours);
                assert.deepStrictEqual(duration.asHours(), hours);
            });
        }

        durationFromHoursTest(-5);
        durationFromHoursTest(-1.1);
        durationFromHoursTest(0);
        durationFromHoursTest(1.7);
        durationFromHoursTest(100);
    });

    suite("durationFromMinutes()", () => {
        function durationFromMinutesTest(minutes: number): void {
            test(`with ${minutes}`, () => {
                const duration: time.Duration = time.durationFromMinutes(minutes);
                assert.deepStrictEqual(duration.asMinutes(), minutes);
            });
        }

        durationFromMinutesTest(-5);
        durationFromMinutesTest(-1.1);
        durationFromMinutesTest(0);
        durationFromMinutesTest(1.7);
        durationFromMinutesTest(100);
    });

    suite("durationFromSeconds()", () => {
        function durationFromSecondsTest(seconds: number): void {
            test(`with ${seconds}`, () => {
                const duration: time.Duration = time.durationFromSeconds(seconds);
                assert.deepStrictEqual(duration.asSeconds(), seconds);
            });
        }

        durationFromSecondsTest(-5);
        durationFromSecondsTest(-1.1);
        durationFromSecondsTest(0);
        durationFromSecondsTest(1.7);
        durationFromSecondsTest(100);
    });

    suite("durationFromMilliseconds()", () => {
        function durationFromMillisecondsTest(milliseconds: number): void {
            test(`with ${milliseconds}`, () => {
                const duration: time.Duration = time.durationFromMilliseconds(milliseconds);
                assert.deepStrictEqual(duration.asMilliseconds(), milliseconds);
            });
        }

        durationFromMillisecondsTest(-5);
        durationFromMillisecondsTest(-1.1);
        durationFromMillisecondsTest(0);
        durationFromMillisecondsTest(1.7);
        durationFromMillisecondsTest(100);
    });

    suite("durationFrom", () => {
        test("with only days", () => {
            const duration: time.Duration = time.durationFrom({ days: 500 });
            assert.deepStrictEqual(duration.getDays(), 500);
            assert.deepStrictEqual(duration.asDays(), 500);
            assert.deepStrictEqual(duration.getHours(), 0);
            assert.deepStrictEqual(duration.asHours(), 12000);
            assert.deepStrictEqual(duration.getMinutes(), 0);
            assert.deepStrictEqual(duration.asMinutes(), 720000);
            assert.deepStrictEqual(duration.getSeconds(), 0);
            assert.deepStrictEqual(duration.asSeconds(), 43200000);
            assert.deepStrictEqual(duration.getMilliseconds(), 0);
            assert.deepStrictEqual(duration.asMilliseconds(), 43200000000);
        });

        test("with hours", () => {
            const duration: time.Duration = time.durationFrom({ hours: 13 });
            assert.deepStrictEqual(duration.getDays(), 0);
            assert.deepStrictEqual(duration.asDays(), 0.5416666666666666);
            assert.deepStrictEqual(duration.getHours(), 13);
            assert.deepStrictEqual(duration.asHours(), 13);
            assert.deepStrictEqual(duration.getMinutes(), 0);
            assert.deepStrictEqual(duration.asMinutes(), 780);
            assert.deepStrictEqual(duration.getSeconds(), 0);
            assert.deepStrictEqual(duration.asSeconds(), 46800);
            assert.deepStrictEqual(duration.getMilliseconds(), 0);
            assert.deepStrictEqual(duration.asMilliseconds(), 46800000);
        });

        test("with hours (but more than 24)", () => {
            const duration: time.Duration = time.durationFrom({ hours: 25 });
            assert.deepStrictEqual(duration.getDays(), 1);
            assert.deepStrictEqual(duration.asDays(), 1.0416666666666667);
            assert.deepStrictEqual(duration.getHours(), 1);
            assert.deepStrictEqual(duration.asHours(), 25);
            assert.deepStrictEqual(duration.getMinutes(), 0);
            assert.deepStrictEqual(duration.asMinutes(), 1500);
            assert.deepStrictEqual(duration.getSeconds(), 0);
            assert.deepStrictEqual(duration.asSeconds(), 90000);
            assert.deepStrictEqual(duration.getMilliseconds(), 0);
            assert.deepStrictEqual(duration.asMilliseconds(), 90000000);
        });

        test("with 1 milliseconds", () => {
            const duration: time.Duration = time.durationFrom({ milliseconds: 1 });
            assert.deepStrictEqual(duration.getDays(), 0);
            assert.deepStrictEqual(duration.asDays(), 1.1574074074074074e-8);
            assert.deepStrictEqual(duration.getHours(), 0);
            assert.deepStrictEqual(duration.asHours(), 2.7777777777777776e-7);
            assert.deepStrictEqual(duration.getMinutes(), 0);
            assert.deepStrictEqual(duration.asMinutes(), 0.000016666666666666667);
            assert.deepStrictEqual(duration.getSeconds(), 0);
            assert.deepStrictEqual(duration.asSeconds(), 0.001);
            assert.deepStrictEqual(duration.getMilliseconds(), 1);
            assert.deepStrictEqual(duration.asMilliseconds(), 1);
        });

        test("with -1 milliseconds", () => {
            const duration: time.Duration = time.durationFrom({ milliseconds: -1 });
            assert.deepStrictEqual(duration.getDays(), 0);
            assert.deepStrictEqual(duration.asDays(), -1.1574074074074074e-8);
            assert.deepStrictEqual(duration.getHours(), 0);
            assert.deepStrictEqual(duration.asHours(), -2.7777777777777776e-7);
            assert.deepStrictEqual(duration.getMinutes(), 0);
            assert.deepStrictEqual(duration.asMinutes(), -0.000016666666666666667);
            assert.deepStrictEqual(duration.getSeconds(), 0);
            assert.deepStrictEqual(duration.asSeconds(), -0.001);
            assert.deepStrictEqual(duration.getMilliseconds(), -1);
            assert.deepStrictEqual(duration.asMilliseconds(), -1);
        });
    });

    test("dateFrom()", () => {
        const date: time.Date = time.dateFrom({
            year: 2017,
            month: 8,
            dayOfMonth: 18
        });
        assert.deepStrictEqual(date.getYear(), 2017);
        assert.deepStrictEqual(date.getMonth(), 8);
        assert.deepStrictEqual(date.getDayOfMonth(), 18);
    });

    suite("timeFrom()", () => {
        test("with only hour", () => {
            const t: time.Time = time.timeFrom({
                hour: 7
            });
            assert.deepStrictEqual(t.getHour(), 7);
            assert.deepStrictEqual(t.getMinute(), 0);
            assert.deepStrictEqual(t.getSecond(), 0);
            assert.deepStrictEqual(t.getMillisecond(), 0);
        });

        test("with only millisecond", () => {
            const t: time.Time = time.timeFrom({
                millisecond: 4
            });
            assert.deepStrictEqual(t.getHour(), 0);
            assert.deepStrictEqual(t.getMinute(), 0);
            assert.deepStrictEqual(t.getSecond(), 0);
            assert.deepStrictEqual(t.getMillisecond(), 4);
        });
    });

    suite("dateTimeFrom()", () => {
        test("with year, month, dayOfMonth", () => {
            const dateTime: time.DateTime = time.dateTimeFrom({
                year: 1,
                month: 2,
                dayOfMonth: 3
            });
            assert.deepStrictEqual(dateTime.getYear(), 1);
            assert.deepStrictEqual(dateTime.getMonth(), 2);
            assert.deepStrictEqual(dateTime.getDayOfMonth(), 3);
            assert.deepStrictEqual(dateTime.getHour(), 0);
            assert.deepStrictEqual(dateTime.getMinute(), 0);
            assert.deepStrictEqual(dateTime.getSecond(), 0);
            assert.deepStrictEqual(dateTime.getMillisecond(), 0);
        });
    });

    suite("Time", () => {
        suite("timeDifference()", () => {
            suite("with Time", () => {
                test("with same", () => {
                    const t: time.Time = time.timeFrom({
                        hour: 1,
                        minute: 2,
                        second: 3,
                        millisecond: 4
                    });
                    const difference: time.Duration = t.timeDifference(t);
                    assert.deepStrictEqual(difference.getDays(), 0);
                    assert.deepStrictEqual(difference.getHours(), 0);
                    assert.deepStrictEqual(difference.getMinutes(), 0);
                    assert.deepStrictEqual(difference.getSeconds(), 0);
                    assert.deepStrictEqual(difference.getMilliseconds(), 0);
                });

                test("with 1 millisecond ahead", () => {
                    const lhs: time.Time = time.timeFrom({
                        hour: 1,
                        minute: 2,
                        second: 3,
                        millisecond: 4
                    });
                    const rhs: time.Time = time.timeFrom({
                        hour: lhs.getHour(),
                        minute: lhs.getMinute(),
                        second: lhs.getSecond(),
                        millisecond: lhs.getMillisecond() + 1
                    });
                    const difference: time.Duration = lhs.timeDifference(rhs);
                    assert.deepStrictEqual(difference.getDays(), 0);
                    assert.deepStrictEqual(difference.getHours(), 0);
                    assert.deepStrictEqual(difference.getMinutes(), 0);
                    assert.deepStrictEqual(difference.getSeconds(), 0);
                    assert.deepStrictEqual(difference.getMilliseconds(), -1);
                });

                test("with 1 millisecond behind", () => {
                    const lhs: time.Time = time.timeFrom({
                        hour: 1,
                        minute: 2,
                        second: 3,
                        millisecond: 4
                    });
                    const rhs: time.Time = time.timeFrom({
                        hour: lhs.getHour(),
                        minute: lhs.getMinute(),
                        second: lhs.getSecond(),
                        millisecond: lhs.getMillisecond() - 1
                    });
                    const difference: time.Duration = lhs.timeDifference(rhs);
                    assert.deepStrictEqual(difference.getDays(), 0);
                    assert.deepStrictEqual(difference.getHours(), 0);
                    assert.deepStrictEqual(difference.getMinutes(), 0);
                    assert.deepStrictEqual(difference.getSeconds(), 0);
                    assert.deepStrictEqual(difference.getMilliseconds(), 1);
                });
            });
        });
    });

    suite("MomentDateTime", () => {
        test("toUTC()", () => {
            const clock = new time.RealClock();
            const localDateTime: time.DateTime = clock.getLocalDateTime();
            const utcDateTime: time.DateTime = localDateTime.toUTC();
            assert.deepStrictEqual(utcDateTime.getTimeZoneOffset().asHours(), 0);
            assert.equal(utcDateTime.toUTC(), utcDateTime);
        });

        suite("timeDifference()", () => {
            test("with same", () => {
                const dateTime: time.DateTime = time.dateTimeFrom({
                    year: 2017,
                    month: 8,
                    dayOfMonth: 17,
                    hour: 15,
                    minute: 45,
                    second: 22,
                    millisecond: 300
                });
                const difference: time.Duration = dateTime.timeDifference(dateTime);
                assert.deepStrictEqual(difference.getDays(), 0);
                assert.deepStrictEqual(difference.getHours(), 0);
                assert.deepStrictEqual(difference.getMinutes(), 0);
                assert.deepStrictEqual(difference.getSeconds(), 0);
                assert.deepStrictEqual(difference.getMilliseconds(), 0);
            });

            test("with one millisecond behind", () => {
                const lhs: time.DateTime = time.dateTimeFrom({
                    year: 2017,
                    month: 8,
                    dayOfMonth: 17,
                    hour: 15,
                    minute: 45,
                    second: 22,
                    millisecond: 300
                });
                const rhs: time.DateTime = time.dateTimeFrom({
                    year: lhs.getYear(),
                    month: lhs.getMonth(),
                    dayOfMonth: lhs.getDayOfMonth(),
                    hour: lhs.getHour(),
                    minute: lhs.getMinute(),
                    second: lhs.getSecond(),
                    millisecond: lhs.getMillisecond() - 1
                });
                const difference: time.Duration = lhs.timeDifference(rhs);
                assert.deepStrictEqual(difference.getDays(), 0);
                assert.deepStrictEqual(difference.getHours(), 0);
                assert.deepStrictEqual(difference.getMinutes(), 0);
                assert.deepStrictEqual(difference.getSeconds(), 0);
                assert.deepStrictEqual(difference.getMilliseconds(), 1);
            });

            test("with one millisecond ahead", () => {
                const lhs: time.DateTime = time.dateTimeFrom({
                    year: 2017,
                    month: 8,
                    dayOfMonth: 17,
                    hour: 15,
                    minute: 45,
                    second: 22,
                    millisecond: 300
                });
                const rhs: time.DateTime = time.dateTimeFrom({
                    year: lhs.getYear(),
                    month: lhs.getMonth(),
                    dayOfMonth: lhs.getDayOfMonth(),
                    hour: lhs.getHour(),
                    minute: lhs.getMinute(),
                    second: lhs.getSecond(),
                    millisecond: lhs.getMillisecond() + 1
                });
                const difference: time.Duration = lhs.timeDifference(rhs);
                assert.deepStrictEqual(difference.getDays(), 0);
                assert.deepStrictEqual(difference.getHours(), 0);
                assert.deepStrictEqual(difference.getMinutes(), 0);
                assert.deepStrictEqual(difference.getSeconds(), 0);
                assert.deepStrictEqual(difference.getMilliseconds(), -1);
            });
        });

        suite("dateDifference()", () => {
            test("with same", () => {
                const dateTime: time.DateTime = time.dateTimeFrom({
                    year: 2017,
                    month: 8,
                    dayOfMonth: 17,
                    hour: 15,
                    minute: 45,
                    second: 22,
                    millisecond: 300
                });
                const difference: time.Duration = dateTime.dateDifference(dateTime);
                assert.deepStrictEqual(difference.getDays(), 0);
                assert.deepStrictEqual(difference.getHours(), 0);
                assert.deepStrictEqual(difference.getMinutes(), 0);
                assert.deepStrictEqual(difference.getSeconds(), 0);
                assert.deepStrictEqual(difference.getMilliseconds(), 0);
            });
        });

        suite("dateTimeDifference()", () => {
            test("with same", () => {
                const dateTime: time.DateTime = time.dateTimeFrom({
                    year: 2017,
                    month: 8,
                    dayOfMonth: 17,
                    hour: 15,
                    minute: 45,
                    second: 22,
                    millisecond: 300
                });
                const difference: time.Duration = dateTime.difference(dateTime);
                assert.deepStrictEqual(difference.getDays(), 0);
                assert.deepStrictEqual(difference.getHours(), 0);
                assert.deepStrictEqual(difference.getMinutes(), 0);
                assert.deepStrictEqual(difference.getSeconds(), 0);
                assert.deepStrictEqual(difference.getMilliseconds(), 0);
            });
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