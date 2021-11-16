import React, {
  FC,
  ProfilerOnRenderCallback,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Events } from "../constants";
import { STORY_RENDERED } from "@storybook/core-events";
import { useChannel } from "@storybook/api";

interface ProfilerStat {
  phase: "mount" | "update";
  actualDuration: number;
  baseDuration: number;
}

export const MyPanel = () => {
  const [timeBetween, setTimeBetween] = useState(20);
  const [numSamples, setNumSamples] = useState(100);
  const {
    running,
    onRender,
    runTests,
    resetData,
    stats,
    updateCount,
    mountCount,
  } = useUpdateRunner({
    timeBetween,
    numMountSamples: numSamples,
    numUpdateSamples: numSamples,
  });

  useEffect(() => {
    emit(Events.SetUpdateCount, updateCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCount]);

  useEffect(() => {
    emit(Events.SetMountCount, mountCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mountCount]);

  const emit = useChannel({
    [STORY_RENDERED]: () => {
      resetData();
    },
    [Events.OnRenderUpdate]: (data: Parameters<ProfilerOnRenderCallback>) => {
      onRender(...data);
    },
  });

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={runTests} disabled={!!running}>
          Run Tests
        </button>

        <label>
          Test samples
          <input
            disabled={!!running}
            type="number"
            min={0}
            max={1000}
            value={numSamples}
            onChange={(e) => setNumSamples(e.currentTarget.valueAsNumber)}
          />
        </label>

        <label>
          Timeout between samples
          <input
            disabled={!!running}
            type="number"
            min={0}
            max={1000}
            value={timeBetween}
            onChange={(e) => setTimeBetween(e.currentTarget.valueAsNumber)}
          />
        </label>
      </div>

      {running && (
        <progress
          id="file"
          value={(updateCount + mountCount) / (numSamples * 2)}
          max="1"
        />
      )}

      <StatTable stats={stats} />
    </div>
  );
};

const StatTable: FC<{ stats: ProfilerStat[] }> = ({ stats }) => {
  if (stats.length === 0) {
    return null;
  }

  const sum = (arr: Array<number>) => arr.reduce((a, b) => a + b, 0);

  const mounts = stats.filter((s) => s.phase === "mount");
  const updates = stats.filter((s) => s.phase === "update");

  const mountAverageMs =
    sum(mounts.map((s) => s.actualDuration)) / mounts.length;

  const updateAverageMs =
    sum(updates.map((s) => s.actualDuration)) / updates.length;

  return (
    <div>
      <h3
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          padding: "1rem",
          border: "1px solid",
          margin: "1rem 0",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        Speed: {mountAverageMs.toFixed(2)}ms
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "space-around",
          marginTop: "1rem",
        }}
      >
        <table>
          <caption>Mount Timings</caption>
          <thead>
            <tr>
              <th>Actual Duration</th>
              <th>Base Duration</th>
            </tr>
          </thead>
          <tbody>
            {mounts.map((s, i) => (
              <tr key={i}>
                <td>{s.actualDuration.toFixed(2)}</td>
                <td>{s.baseDuration.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td>
                <b>Average: {mountAverageMs.toFixed(2)}</b>
              </td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>

        <table>
          <caption>Update Timings</caption>
          <thead>
            <tr>
              <th>Actual Duration</th>
              <th>Base Duration</th>
            </tr>
          </thead>
          <tbody>
            {updates.map((s, i) => (
              <tr key={i}>
                <td>{s.actualDuration.toFixed(2)}</td>
                <td>{s.baseDuration.toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td>
                <b>Average: {updateAverageMs.toFixed(2)}</b>
              </td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

function useUpdateRunner({
  timeBetween,
  numMountSamples,
  numUpdateSamples,
}: {
  timeBetween: number;
  numMountSamples: number;
  numUpdateSamples: number;
}) {
  const [stats, setStats] = useState<ProfilerStat[]>([]);
  const [running, setRunning] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [mountCount, setMountCount] = useState(0);

  function resetData() {
    setRunning(false);
    setMountCount(0);
    setUpdateCount(0);
    setStats([]);
  }

  function runTests() {
    resetData();

    // Wait some arbitrary time until reset has re-rendered!
    setTimeout(() => {
      setRunning(true);
      setMountCount(1);
    }, 50);
  }

  const onRender: ProfilerOnRenderCallback = useCallback(
    (_, phase, actualDuration, baseDuration) => {
      if (!running) {
        return;
      }

      setStats((prev) =>
        prev.concat({
          phase,
          actualDuration,
          baseDuration,
        }),
      );

      // Alternate runs between mount and update until both are completed
      if (mountCount < numMountSamples && mountCount <= updateCount) {
        setTimeout(() => setMountCount((n) => n + 1), timeBetween);
      } else if (updateCount < numUpdateSamples) {
        setTimeout(() => setUpdateCount((n) => n + 1), timeBetween);
      } else {
        setRunning(false);
      }
    },
    [
      running,
      setStats,
      updateCount,
      mountCount,
      setUpdateCount,
      setMountCount,
      timeBetween,
      numMountSamples,
      numUpdateSamples,
    ],
  );

  return {
    running,
    onRender,
    runTests,
    resetData,
    stats,
    updateCount,
    mountCount,
  };
}
