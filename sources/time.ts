import * as moment from "moment";

/**
 * A Duration implementation that uses the moment library internally.
 */
export interface Duration {
    /**
     * Get the days segment in this Duration. For example, a duration that lasted 1 day, 2 hours, 3
     * minutes, 4 seconds, and 5 milliseconds would return 1.
     */
    getDays(): number;

    /**
     * Get the hours segment in this Duration. For example, a duration that lasted 1 day, 2 hours, 3
     * minutes, 4 seconds, and 5 milliseconds would return 2.
     */
    getHours(): number;

    /**
     * Get the minutes segment in this Duration. For example, a duration that lasted 1 day, 2 hours,
     * 3 minutes, 4 seconds, and 5 milliseconds would return 3.
     */
    getMinutes(): number;

    /**
     * Get the seconds segment in this Duration. For example, a duration that lasted 1 day, 2 hours,
     * 3 minutes, 4 seconds, and 5 milliseconds would return 4.
     */
    getSeconds(): number;

    /**
     * Get the milliseconds segment in this Duration. For example, a duration that lasted 1 day, 2
     * hours, 3 minutes, 4 seconds, and 5 milliseconds would return 5.
     */
    getMilliseconds(): number;

    /**
     * Get the total number of days that this duration lasts. For example, a duration that lasted 1
     * day, 2 hours, 3 minutes, 4 seconds, and 5 milliseconds would return 1.????.
     */
    asDays(): number;

    /**
     * Get the total number of hours that this duration lasts. For example, a duration that lasted 1
     * day, 2 hours, 3 minutes, 4 seconds, and 5 milliseconds would return 26.????.
     */
    asHours(): number;

    /**
     * Get the total number of minutes that this duration lasts. For example, a duration that lasted
     * 1 day, 2 hours, 3 minutes, 4 seconds, and 5 milliseconds would return 1250.????.
     */
    asMinutes(): number;

    /**
     * Get the total number of seconds that this duration lasts. For example, a duration that lasted
     * 1 day, 2 hours, 3 minutes, 4 seconds, and 5 milliseconds would return 1250.????.
     */
    asSeconds(): number;

    /**
     * Get the total number of milliseconds that this duration lasts. For example, a duration that
     * lasted 1 day, 2 hours, 3 minutes, 4 seconds, and 5 milliseconds would return 1250.????.
     */
    asMilliseconds(): number;
}

export interface DurationDetails {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}

/**
 * Create a new duration from the provided number of days.
 * @param days The number of days in the duration.
 */
export function durationFromDays(days: number): Duration {
    return durationFrom({ days: days });
}

/**
 * Create a new duration from the provided number of hours.
 * @param hours The number of hours in the duration.
 */
export function durationFromHours(hours: number): Duration {
    return durationFrom({ hours: hours });
}

/**
 * Create a new duration from the provided number of minutes.
 * @param minutes The number of minutes in the duration.
 */
export function durationFromMinutes(minutes: number): Duration {
    return durationFrom({ minutes: minutes });
}

/**
 * Create a new duration from the provided number of seconds.
 * @param seconds The number of seconds in the duration.
 */
export function durationFromSeconds(seconds: number): Duration {
    return durationFrom({ seconds: seconds });
}

/**
 * Create a new duration from the provided number of milliseconds.
 * @param milliseconds The number of milliseconds in the duration.
 */
export function durationFromMilliseconds(milliseconds: number): Duration {
    return durationFrom({ milliseconds: milliseconds });
}

/**
 * Create a new duration from the provided duration units.
 * @param days The number of days in the duration.
 * @param hours The number of hours in the duration.
 * @param minutes The number of minutes in the duration.
 * @param seconds The number of seconds in the duration.
 * @param milliseconds The number of milliseconds in the duration.
 */
export function durationFrom(details: DurationDetails): Duration {
    return new RealDuration(moment.duration({
        days: details.days,
        hours: details.hours,
        minutes: details.minutes,
        seconds: details.seconds,
        milliseconds: details.milliseconds
    }));
}

/**
 * This interface contains information about a specific date without regard to the time of the date.
 */
export interface Date {
    /**
     * Get the year of this Date.
     */
    getYear(): number;

    /**
     * Get the month of this Date.
     */
    getMonth(): number;

    /**
     * Get the day of the month of this Date.
     */
    getDayOfMonth(): number;

    /**
     * Get the difference between this Date and the provided Date or DateTime.
     */
    dateDifference(rhs: Date | DateTime): Duration;
}

export interface DateDetails {
    year: number;
    month: number;
    dayOfMonth: number;
}

/**
 * Create a new Date object from the provided details.
 * @param details The details of the Date object to create.
 */
export function dateFrom(details: DateDetails): Date {
    return new MomentDateTime(moment({
        year: details.year,
        month: details.month - 1,
        date: details.dayOfMonth
    }));
}

/**
 * This interface contains information about a specific time of the day without regard to which day.
 */
export interface Time {
    /**
     * Get the hour of this Time.
     */
    getHour(): number;

    /**
     * Get the minute of this Time.
     */
    getMinute(): number;

    /**
     * Get the second of this Time.
     */
    getSecond(): number;

    /**
     * Get the millisecond of this Time.
     */
    getMillisecond(): number;

    /**
     * Get the UTC version of this Time object.
     */
    toUTC(): Time;

    /**
     * Get the offset Duration that this time is from UTC (the zero offset);
     */
    getTimeZoneOffset(): Duration;

    /**
     * Get the difference between this Time and the provided Time or DateTime.
     */
    timeDifference(rhs: Time | DateTime): Duration;
}

export interface TimeDetails {
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}

export function timeFrom(details: TimeDetails): Time {
    return new MomentDateTime(moment({
        hour: details.hour,
        minute: details.minute,
        second: details.second,
        millisecond: details.millisecond
    }));
}

/**
 * This interface contains information about a specific time on a specific date.
 */
export interface DateTime extends Date, Time {
    /**
     * Get the UTC version of this DateTime object.
     */
    toUTC(): DateTime;

    /**
     * Get the difference between this DateTime and the provided Time, Date, or DateTime.
     */
    difference(rhs: DateTime): Duration;
}

export interface DateTimeDetails extends DateDetails, TimeDetails {
}

export function dateTimeFrom(details: DateTimeDetails): DateTime {
    return new MomentDateTime(moment({
        year: details.year,
        month: details.month - 1,
        date: details.dayOfMonth,
        hour: details.hour,
        minute: details.minute,
        second: details.second,
        millisecond: details.millisecond
    }));
}

/**
 * This interface defines functions that can be used to get information about the date and time at
 * which an application is running.
 */
export interface Clock {
    /**
     * Get the current local date according to this Clock.
     */
    getLocalDate(): Date;

    /**
     * Get the current local time according to this Clock.
     */
    getLocalTime(): Time;

    /**
     * Get the current local date and time according to this Clock.
     */
    getLocalDateTime(): DateTime;

    /**
     * Get the current UTC date according to this Clock.
     */
    getUTCDate(): Date;

    /**
     * Get the current UTC time according to this Clock.
     */
    getUTCTime(): Time;

    /**
     * Get the current UTC date and time according to this Clock.
     */
    getUTCDateTime(): DateTime;
}

/**
 * A Duration implementation that uses the moment library internally.
 */
class RealDuration implements Duration {
    constructor(private _data: moment.Duration) {
    }

    /**
     * Get the days segment in this Duration. For example, a duration that lasted 1 day, 2 hours, 3
     * minutes, 4 seconds, and 5 milliseconds would return 1.
     */
    public getDays(): number {
        const days: number = this._data.asDays();
        return days >= 0 ? Math.floor(days) : Math.ceil(days);
    }

    /**
     * Get the hours segment in this Duration. For example, a duration that lasted 1 day, 2 hours, 3
     * minutes, 4 seconds, and 5 milliseconds would return 2.
     */
    public getHours(): number {
        return this._data.hours();
    }

    /**
     * Get the minutes segment in this Duration. For example, a duration that lasted 1 day, 2 hours,
     * 3 minutes, 4 seconds, and 5 milliseconds would return 3.
     */
    public getMinutes(): number {
        return this._data.minutes();
    }

    /**
     * Get the seconds segment in this Duration. For example, a duration that lasted 1 day, 2 hours,
     * 3 minutes, 4 seconds, and 5 milliseconds would return 4.
     */
    public getSeconds(): number {
        return this._data.seconds();
    }

    /**
     * Get the milliseconds segment in this Duration. For example, a duration that lasted 1 day, 2
     * hours, 3 minutes, 4 seconds, and 5 milliseconds would return 5.
     */
    public getMilliseconds(): number {
        return this._data.milliseconds();
    }

    /**
     * Get the total number of days that this duration lasts. For example, a duration that lasted 1
     * day, 2 hours, 3 minutes, 4 seconds, and 5 milliseconds would return 1.????.
     */
    public asDays(): number {
        return this._data.asDays();
    }

    /**
     * Get the total number of hours that this duration lasts. For example, a duration that lasted 1
     * day, 2 hours, 3 minutes, 4 seconds, and 5 milliseconds would return 26.????.
     */
    public asHours(): number {
        return this._data.asHours();
    }

    /**
     * Get the total number of minutes that this duration lasts. For example, a duration that lasted
     * 1 day, 2 hours, 3 minutes, 4 seconds, and 5 milliseconds would return 1250.????.
     */
    public asMinutes(): number {
        return this._data.asMinutes();
    }

    /**
     * Get the total number of seconds that this duration lasts. For example, a duration that lasted
     * 1 day, 2 hours, 3 minutes, 4 seconds, and 5 milliseconds would return 1250.????.
     */
    public asSeconds(): number {
        return this._data.asSeconds();
    }

    /**
     * Get the total number of milliseconds that this duration lasts. For example, a duration that
     * lasted 1 day, 2 hours, 3 minutes, 4 seconds, and 5 milliseconds would return 1250.????.
     */
    public asMilliseconds(): number {
        return this._data.asMilliseconds();
    }
}

/**
 * A DateTime implementation that uses the moment library internally.
 */
class MomentDateTime {
    constructor(private _data: moment.Moment) {
    }

    /**
     * Get the year of this Date.
     */
    public getYear(): number {
        return this._data.year();
    }

    /**
     * Get the month of this Date.
     */
    public getMonth(): number {
        // According to this (http://momentjs.com/docs/#/get-set/month/), moment months are returned
        // between 0 and 11, so add 1 to make it between 1 and 12.
        return this._data.month() + 1;
    }

    /**
     * Get the day of the month of this Date.
     */
    public getDayOfMonth(): number {
        return this._data.date();
    }

    /**
     * Get the hour of this Time.
     */
    public getHour(): number {
        return this._data.hour();
    }

    /**
     * Get the minute of this Time.
     */
    public getMinute(): number {
        return this._data.minute();
    }

    /**
     * Get the second of this Time.
     */
    public getSecond(): number {
        return this._data.second();
    }

    /**
     * Get the millisecond of this Time.
     */
    public getMillisecond(): number {
        return this._data.millisecond();
    }

    /**
     * Get the offset Duration that this time is from UTC (the zero offset);
     */
    public getTimeZoneOffset(): Duration {
        return durationFromMinutes(this._data.utcOffset());
    }

    /**
     * Get the UTC version of this Time object.
     */
    public toUTC(): DateTime {
        return this._data.isUTC() ? this : new MomentDateTime(this._data.utc());
    }

    /**
     * Get the date difference between this DateTime and the provided Time or DateTime.
     */
    public timeDifference(rhs: Time | DateTime): Duration {
        const lhsMoment: moment.Moment = toMomentTime(this);
        const rhsMoment: moment.Moment = toMomentTime(rhs);
        const millisecondDifference: number = lhsMoment.diff(rhsMoment);
        return new RealDuration(moment.duration(millisecondDifference));
    }

    /**
     * Get the date difference between this DateTime and the provided Date or DateTime.
     */
    public dateDifference(rhs: Date | DateTime): Duration {
        const lhsMoment: moment.Moment = moment({
            year: this.getYear(),
            month: this.getMonth() - 1,
            date: this.getDayOfMonth()
        });
        const rhsMoment: moment.Moment = moment({
            year: rhs.getYear(),
            month: rhs.getMonth() - 1,
            date: rhs.getDayOfMonth()
        });
        const millisecondDifference: number = lhsMoment.diff(rhsMoment);
        return new RealDuration(moment.duration(millisecondDifference));
    }

    /**
     * Get the date and time difference between this DateTime and the provided Time, Date, or
     * DateTime.
     */
    public difference(rhs: DateTime): Duration {
        const subtractor: moment.Moment = moment({
            year: rhs.getYear(),
            month: rhs.getMonth() - 1,
            date: rhs.getDayOfMonth(),
            hour: rhs.getHour(),
            minute: rhs.getMinute(),
            second: rhs.getSecond(),
            millisecond: rhs.getMillisecond()
        });
        const millisecondDifference: number = this._data.diff(subtractor);
        return new RealDuration(moment.duration(millisecondDifference));
    }
}

/**
 * A Clock implementation that uses the moment (https://www.npmjs.com/package/moment) Javascript library.
 */
export class RealClock implements Clock {
    /**
     * Get the current local date according to this Clock.
     */
    public getLocalDate(): Date {
        return this.getLocalDateTime();
    }

    /**
     * Get the current local time according to this Clock.
     */
    public getLocalTime(): Time {
        return this.getLocalDateTime();
    }

    /**
     * Get the current local date and time according to this Clock.
     */
    public getLocalDateTime(): DateTime {
        const data: moment.Moment = moment();
        return new MomentDateTime(data);
    }

    /**
     * Get the current UTC date according to this Clock.
     */
    public getUTCDate(): Date {
        return this.getUTCDateTime();
    }

    /**
     * Get the current UTC time according to this Clock.
     */
    public getUTCTime(): Time {
        return this.getUTCDateTime();
    }

    /**
     * Get the current UTC date and time according to this Clock.
     */
    public getUTCDateTime(): DateTime {
        const data: moment.Moment = moment.utc();
        return new MomentDateTime(data);
    }
}

function toMomentTime(time: Time): moment.Moment {
    return moment({
        hour: time.getHour(),
        minute: time.getMinute(),
        second: time.getSecond(),
        millisecond: time.getMillisecond()
    });
}