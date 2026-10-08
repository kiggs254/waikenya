import { CalendarDays } from "lucide-react";

export type CalendarEntry = {
    /** 0-11 */
    month: number;
    title: string;
    detail: string;
    /** Recurring fixtures in the Chapter's year, as opposed to a dated entry. */
    annual?: boolean;
    past?: boolean;
    href?: string;
};

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

/**
 * The Chapter's year at a glance. A month grid rather than a day grid: our
 * events are a handful of anchors a year, and a day grid would be mostly empty.
 */
export default function EventsCalendar({
    entries,
    currentMonth,
}: {
    entries: CalendarEntry[];
    currentMonth: number;
}) {
    return (
        <div className="cal-grid">
            {MONTHS.map((name, i) => {
                const monthEntries = entries.filter((e) => e.month === i);
                const isNow = i === currentMonth;

                return (
                    <div
                        key={name}
                        className={[
                            "cal-month",
                            monthEntries.length === 0 ? "cal-month-empty" : "",
                            isNow ? "cal-month-now" : "",
                        ].filter(Boolean).join(" ")}
                    >
                        <div className="cal-month-head">
                            <span className="cal-month-name">{name}</span>
                            {isNow && <span className="cal-month-badge">This month</span>}
                        </div>

                        {monthEntries.length > 0 ? (
                            <ul className="cal-entries">
                                {monthEntries.map((e) => (
                                    <li key={`${e.title}-${e.detail}`} className={e.past ? "cal-entry cal-entry-past" : "cal-entry"}>
                                        <p className="cal-entry-title">
                                            {e.href ? <a href={e.href}>{e.title}</a> : e.title}
                                        </p>
                                        <p className="cal-entry-detail">
                                            {e.annual && <span className="cal-chip">Annual</span>}
                                            {e.detail}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="cal-none">
                                <CalendarDays size={14} strokeWidth={1.9} />
                                No scheduled events
                            </p>
                        )}
                    </div>
                );
            })}

            <style>{`
                .cal-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1rem;
                }
                .cal-month {
                    background: var(--white);
                    border: 1px solid #e4e9ec;
                    border-radius: 8px;
                    padding: 1.4rem 1.35rem;
                    min-height: 150px;
                    display: flex;
                    flex-direction: column;
                }
                .cal-month-empty { background: var(--off-white); border-style: dashed; }
                .cal-month-now { border-color: var(--gold); box-shadow: 0 6px 24px rgba(201,168,76,0.2); }
                .cal-month-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.5rem;
                    padding-bottom: 0.8rem;
                    margin-bottom: 0.9rem;
                    border-bottom: 1px solid #eef1f3;
                }
                .cal-month-name {
                    font-size: 0.78rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: var(--teal-deep);
                }
                .cal-month-empty .cal-month-name { color: var(--gray); }
                .cal-month-badge {
                    font-size: 0.6rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    color: var(--teal-deep);
                    background: var(--gold);
                    padding: 0.2rem 0.5rem;
                    border-radius: 100px;
                    white-space: nowrap;
                }
                .cal-entries {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 0.9rem;
                }
                .cal-entry-title {
                    font-size: 0.92rem;
                    font-weight: 700;
                    color: var(--teal-deep);
                    line-height: 1.4;
                    margin-bottom: 0.2rem;
                }
                .cal-entry-title a { border-bottom: 1px solid rgba(26,107,124,0.3); }
                .cal-entry-title a:hover { color: var(--teal); border-color: var(--teal); }
                .cal-entry-detail {
                    font-size: 0.78rem;
                    color: var(--gray);
                    line-height: 1.55;
                }
                .cal-entry-past .cal-entry-title { color: var(--gray); font-weight: 600; }
                .cal-chip {
                    display: inline-block;
                    font-size: 0.58rem;
                    font-weight: 800;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    color: var(--teal);
                    background: rgba(26,107,124,0.1);
                    padding: 0.12rem 0.42rem;
                    border-radius: 3px;
                    margin-right: 0.45rem;
                    vertical-align: 1px;
                }
                .cal-none {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-size: 0.8rem;
                    color: #a9b2b8;
                    margin-top: auto;
                }
            `}</style>
        </div>
    );
}
