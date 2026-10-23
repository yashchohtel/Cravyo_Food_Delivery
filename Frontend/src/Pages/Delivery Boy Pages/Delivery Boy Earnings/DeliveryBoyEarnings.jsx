import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LuCalendarDays,
  LuChartNoAxesColumnIncreasing,
  LuChevronRight,
  LuClock3,
  LuPackageCheck,
  LuTrendingDown,
  LuTrendingUp,
  LuWallet
} from "react-icons/lu";
import { getMyDeliveryAssignments } from "../../../features/delivery Assignment/deliveryAssignmentThunk";
import "./DeliveryBoyEarnings.css";

const EMPTY_ASSIGNMENTS = Object.freeze([]);

const formatMonthKey = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
};

const getMonthDate = (monthKey) => {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1, 1);
};

const getDateKey = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const getAssignmentDate = (assignment) => {
  const date = new Date(assignment.updatedAt || assignment.createdAt);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getAssignmentEarning = (assignment) => {
  const earning = Number(assignment.deliveryEarning);
  return Number.isFinite(earning) ? earning : 0;
};

const sumEarnings = (assignments) => assignments.reduce(
  (total, assignment) => total + getAssignmentEarning(assignment),
  0
);

const formatMoney = (amount) => `₹${amount.toLocaleString("en-IN", {
  maximumFractionDigits: 0
})}`;

const formatMonthLabel = (monthKey) => getMonthDate(monthKey).toLocaleDateString(
  "en-IN",
  { month: "long", year: "numeric" }
);

const buildMonthOptions = (today) => Array.from({ length: 12 }, (_, index) => {
  const date = new Date(today.getFullYear(), today.getMonth() - index, 1);
  const value = formatMonthKey(date);

  return { value, label: formatMonthLabel(value) };
});

const buildChartBars = (assignments, chartPeriod, selectedMonth) => {
  let bars;

  if (chartPeriod === "week") {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    bars = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      const dateKey = getDateKey(date);

      return {
        label: date.toLocaleDateString("en-IN", { weekday: "short" }),
        value: sumEarnings(assignments.filter(
          (assignment) => getDateKey(assignment.date) === dateKey
        ))
      };
    });
  } else {
    const monthDate = getMonthDate(selectedMonth);
    const weekCount = Math.ceil(
      new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate() / 7
    );

    bars = Array.from({ length: weekCount }, (_, index) => {
      const weekNumber = index + 1;

      return {
        label: `Week ${weekNumber}`,
        value: sumEarnings(assignments.filter(
          (assignment) => Math.ceil(assignment.date.getDate() / 7) === weekNumber
        ))
      };
    });
  }

  const maximumValue = Math.max(...bars.map((bar) => bar.value), 0);
  const axisMaximum = Math.max(100, Math.ceil((maximumValue * 1.2) / 100) * 100);
  const highestIndex = bars.findIndex((bar) => bar.value === maximumValue && maximumValue > 0);

  return {
    bars: bars.map((bar, index) => ({
      ...bar,
      height: (bar.value / axisMaximum) * 100,
      highlighted: index === highestIndex
    })),
    axisMaximum
  };
};

const DeliveryBoyEarnings = () => {
  const dispatch = useDispatch();
  const {
    myAssignments,
    myAssignmentsLoading,
    myAssignmentsError
  } = useSelector((state) => state.deliveryAssignment);

  const [selectedMonth, setSelectedMonth] = useState(formatMonthKey(new Date()));
  const [chartPeriod, setChartPeriod] = useState("week");

  // Fetch the delivery boy's assignment history when Earnings opens.
  useEffect(() => {
    dispatch(getMyDeliveryAssignments());
  }, [dispatch]);

  const assignments = Array.isArray(myAssignments) ? myAssignments : EMPTY_ASSIGNMENTS;
  const monthOptions = buildMonthOptions(new Date());
  const currentMonth = formatMonthKey(new Date());
  const todayKey = getDateKey(new Date());

  // Only completed assignments count as earned delivery payments.
  // The backend updates assignment timestamps when delivery is completed.
  const completedAssignments = useMemo(() => assignments
    .filter((assignment) => assignment.status === "completed")
    .map((assignment) => ({
      ...assignment,
      date: getAssignmentDate(assignment)
    }))
    .filter((assignment) => assignment.date)
    .sort((first, second) => second.date - first.date), [assignments]);

  const todayAssignments = completedAssignments.filter(
    (assignment) => getDateKey(assignment.date) === todayKey
  );
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday);
  const yesterdayAssignments = completedAssignments.filter(
    (assignment) => getDateKey(assignment.date) === yesterdayKey
  );

  const monthAssignments = completedAssignments.filter(
    (assignment) => formatMonthKey(assignment.date) === selectedMonth
  );
  const previousMonth = getMonthDate(selectedMonth);
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  const previousMonthKey = formatMonthKey(previousMonth);
  const previousMonthAssignments = completedAssignments.filter(
    (assignment) => formatMonthKey(assignment.date) === previousMonthKey
  );

  const todayEarnings = sumEarnings(todayAssignments);
  const yesterdayEarnings = sumEarnings(yesterdayAssignments);
  const monthEarnings = sumEarnings(monthAssignments);
  const previousMonthEarnings = sumEarnings(previousMonthAssignments);
  const monthlyLabel = selectedMonth === currentMonth
    ? "This month"
    : formatMonthLabel(selectedMonth);

  const monthOptionsByValue = new Set(monthOptions.map((option) => option.value));
  if (!monthOptionsByValue.has(selectedMonth)) {
    monthOptions.unshift({
      value: selectedMonth,
      label: formatMonthLabel(selectedMonth)
    });
  }

  const chartAssignments = chartPeriod === "week"
    ? completedAssignments
    : monthAssignments;
  const chartData = buildChartBars(chartAssignments, chartPeriod, selectedMonth);
  const recentAssignments = monthAssignments.slice(0, 4);
  const todayTrend = yesterdayEarnings > 0
    ? `${todayEarnings >= yesterdayEarnings ? "+" : "−"}${Math.round(
      Math.abs((todayEarnings - yesterdayEarnings) / yesterdayEarnings) * 100
    )}% from yesterday`
    : "Completed deliveries today";
  const todayTrendType = yesterdayEarnings > 0 && todayEarnings < yesterdayEarnings
    ? "negative"
    : "";
  const monthTrend = previousMonthEarnings > 0
    ? `${monthEarnings >= previousMonthEarnings ? "+" : "−"}${Math.round(
      Math.abs((monthEarnings - previousMonthEarnings) / previousMonthEarnings) * 100
    )}% from last month`
    : "Completed delivery earnings";
  const monthTrendType = previousMonthEarnings > 0 && monthEarnings < previousMonthEarnings
    ? "negative"
    : "";

  if (myAssignmentsLoading && assignments.length === 0) {
    return (
      <section className="delivery-earnings-page">
        <header className="delivery-earnings-heading">
          <h1>Earnings</h1>
        </header>
        <div className="delivery-earnings-state" role="status">
          <span className="delivery-earnings-spinner" aria-hidden="true" />
          <p>Loading your earnings…</p>
        </div>
      </section>
    );
  }

  if (myAssignmentsError && assignments.length === 0) {
    return (
      <section className="delivery-earnings-page">
        <header className="delivery-earnings-heading">
          <h1>Earnings</h1>
        </header>
        <div className="delivery-earnings-state" role="alert">
          <p>{myAssignmentsError}</p>
          <button
            type="button"
            className="delivery-earnings-retry"
            onClick={() => dispatch(getMyDeliveryAssignments())}
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="delivery-earnings-page">
      <header className="delivery-earnings-heading">
        <div>
          <h1>Earnings</h1>
          <p>See how your deliveries are adding up.</p>
        </div>
        <label className="delivery-earnings-month-select">
          <LuCalendarDays aria-hidden="true" />
          <select
            aria-label="Select earnings month"
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className="delivery-earnings-summary">
        <article className="delivery-earnings-today-card">
          <div className="delivery-earnings-today-icon">
            <LuWallet aria-hidden="true" />
          </div>
          <div className="delivery-earnings-today-copy">
            <p>Today’s earnings</p>
            <strong>{formatMoney(todayEarnings)}</strong>
            <span className={todayTrendType}>
              {todayTrendType === "negative" ? (
                <LuTrendingDown aria-hidden="true" />
              ) : (
                <LuTrendingUp aria-hidden="true" />
              )}
              {todayTrend}
            </span>
          </div>
        </article>

        <article className="delivery-earnings-stat-card">
          <div className="delivery-earnings-stat-icon month">
            <LuChartNoAxesColumnIncreasing aria-hidden="true" />
          </div>
          <div className="delivery-earnings-stat-copy">
            <p>{monthlyLabel}</p>
            <strong>{formatMoney(monthEarnings)}</strong>
            <span className={monthTrendType}>{monthTrend}</span>
          </div>
        </article>

        <article className="delivery-earnings-stat-card">
          <div className="delivery-earnings-stat-icon orders">
            <LuPackageCheck aria-hidden="true" />
          </div>
          <div className="delivery-earnings-stat-copy">
            <p>Orders delivered</p>
            <strong>{monthAssignments.length}</strong>
            <span>{monthlyLabel}</span>
          </div>
        </article>
      </div>

      <section className="delivery-earnings-chart-card">
        <div className="delivery-earnings-section-heading">
          <div>
            <h2>Earnings overview</h2>
            <p>
              {chartPeriod === "week"
                ? "Daily earnings for this week"
                : `Weekly earnings for ${formatMonthLabel(selectedMonth)}`}
            </p>
          </div>
          <select
            className="delivery-earnings-period-select"
            aria-label="Earnings chart period"
            value={chartPeriod}
            onChange={(event) => setChartPeriod(event.target.value)}
          >
            <option value="week">This week</option>
            <option value="month">By week</option>
          </select>
        </div>

        <div className="delivery-earnings-chart" role="img" aria-label={
          `Earnings chart. ${chartData.bars.map((bar) =>
            `${bar.label}: ${formatMoney(bar.value)}`
          ).join(", ")}`
        }>
          <div className="delivery-earnings-y-axis" aria-hidden="true">
            <span>{formatMoney(chartData.axisMaximum)}</span>
            <span>{formatMoney(chartData.axisMaximum / 2)}</span>
            <span>₹0</span>
          </div>
          <div className="delivery-earnings-plot">
            <div className="delivery-earnings-gridlines" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="delivery-earnings-bars">
              {chartData.bars.map((bar) => (
                <div className="delivery-earnings-bar-column" key={bar.label}>
                  <div className="delivery-earnings-bar-track">
                    {bar.highlighted && (
                      <span
                        className="delivery-earnings-tooltip"
                        style={{ "--bar-height": `${bar.height}%` }}
                      >
                        {formatMoney(bar.value)}
                      </span>
                    )}
                    <span
                      className={
                        `delivery-earnings-bar ${bar.highlighted ? "highlighted" : ""}`
                      }
                      style={{ "--bar-height": `${bar.height}%` }}
                    />
                  </div>
                  <span className="delivery-earnings-bar-label">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="delivery-earnings-activity">
        <div className="delivery-earnings-section-heading activity-heading">
          <div>
            <h2>Recent activity</h2>
            <p>Completed deliveries in {formatMonthLabel(selectedMonth)}</p>
          </div>
          <span className="delivery-earnings-activity-count">
            {monthAssignments.length} orders
          </span>
        </div>

        {recentAssignments.length > 0 ? (
          <div className="delivery-earnings-activity-list">
            {recentAssignments.map((assignment) => {
              const orderId = assignment.order?._id || assignment.order || assignment._id;
              const orderLabel = String(orderId).slice(-8).toUpperCase();
              const completedTime = assignment.date.toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit"
              });

              return (
                <Link
                  className="delivery-earnings-activity-row"
                  key={assignment._id}
                  to={`/delivery-boy/order/${assignment._id}`}
                  aria-label={`Order ${orderLabel}, delivery completed, ${formatMoney(
                    getAssignmentEarning(assignment)
                  )}`}
                >
                  <span className="delivery-earnings-activity-icon">
                    <LuPackageCheck aria-hidden="true" />
                  </span>
                  <span className="delivery-earnings-activity-copy">
                    <strong>#{orderLabel}</strong>
                    <span>Delivery completed</span>
                    <small>
                      <LuClock3 aria-hidden="true" />
                      {completedTime}
                    </small>
                  </span>
                  <strong className="delivery-earnings-activity-amount">
                    {formatMoney(getAssignmentEarning(assignment))}
                  </strong>
                  <LuChevronRight
                    className="delivery-earnings-activity-chevron"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="delivery-earnings-empty-activity">
            <span className="delivery-earnings-activity-icon">
              <LuPackageCheck aria-hidden="true" />
            </span>
            <p>
              No completed deliveries for {formatMonthLabel(selectedMonth)} yet.
            </p>
          </div>
        )}
      </section>
    </section>
  );
};

export default DeliveryBoyEarnings;
