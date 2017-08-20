import * as time from "./time";

/**
 * A Clock implementation that allows time to advances manually.
 */
export class Clock implements time.Clock {
    constructor(private _now?: time.DateTime) {
        if (!_now) {
            this._now = new time.RealClock().getLocalDateTime();
        }
    }

    /**
     * Get the current local date according to this Clock.
     */
    public getLocalDate(): time.Date {
        return this.getLocalDateTime();
    }

    /**
     * Get the current local time according to this Clock.
     */
    public getLocalTime(): time.Time {
        return this.getLocalDateTime();
    }

    /**
     * Get the current local date and time according to this Clock.
     */
    public getLocalDateTime(): time.DateTime {
        return this._now;
    }

    /**
     * Get the current UTC date according to this Clock.
     */
    public getUTCDate(): time.Date {
        return this.getUTCDateTime();
    }

    /**
     * Get the current UTC time according to this Clock.
     */
    public getUTCTime(): time.Time {
        return this.getUTCDateTime();
    }

    /**
     * Get the current UTC date and time according to this Clock.
     */
    public getUTCDateTime(): time.DateTime {
        return this._now.toUTC();
    }
}