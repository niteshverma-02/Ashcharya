/**
 * Prasar POS — canonical list page (header + filters + chips + tabs + Dashboard|Table + docked drawer).
 * Modelled on franchise-pos/src/pages/RefillOrders.tsx. Copy, rename `Thing`, wire your query.
 *
 * Rules baked in:
 *  - ONE PageHeading card (header, control bar, tabs); KPIs in `meta`, clickable to filter.
 *  - Filters live in the header bar; AppliedFilters chips right under it.
 *  - InsightsRow = 6 panels computed from rows already loaded (NO extra API calls); click = filter.
 *  - Real-grid table, one value per column; row click opens the DetailDrawer (docks ≥1024px).
 *
 * Imports and prop names match the real kit (page-chrome, FilterKit, ModuleInsights, DetailDrawer, table-classes).
 */
import { useMemo, useState } from "react";
import { Package, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PAGE_CARD_CLASS, PageHeading, TAB_CLASS, TABLIST_CLASS } from "@/components/layout/page-chrome";
import {
  ALL_TIME, AppliedFilters, type DateWindow, DateWindowFilter, MultiFilter, SortFilter, compareBy, dateChip, inWindow,
  matchesAny, multiChips, optionsFrom,
} from "@/components/filters/FilterKit";
import {
  BreakdownPanel, ColumnsPanel, InsightsRow, RhythmPanel, StatGridPanel, TopPanel, TrendPanel, monthKey, monthLabel,
} from "@/components/insights/ModuleInsights";
import { DetailDrawer, DrawerBadge, DrawerFields, DrawerStats } from "@/components/drawer/DetailDrawer";
import { TABLE_CLASS, THEAD_CLASS, TH_CLASS, TD_CLASS, CLICK_ROW_CLASS } from "@/components/table/table-classes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Thing = { id: string; code: string; party: string; status: string; amount: number; created_at: string };

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function Things() {
  const { data: rows = [], isLoading } = useQuery<Thing[]>({ queryKey: ["things"], queryFn: fetchThings });
  const [win, setWin] = useState<DateWindow>(ALL_TIME);
  const [party, setParty] = useState<string[]>([]);
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState("newest");
  const [open, setOpen] = useState<Thing | null>(null);

  // Everything below is derived from the loaded rows — dashboards never fetch.
  const scoped = useMemo(
    () => rows.filter((r) => inWindow(r.created_at, win) && matchesAny(r.party, party)),
    [rows, win, party],
  );
  const shown = useMemo(
    () => scoped.filter((r) => tab === "all" || r.status === tab)
      .sort(sort === "newest" ? compareBy<Thing>((r) => r.created_at, "desc") : compareBy<Thing>((r) => r.amount, "desc")),
    [scoped, tab, sort],
  );
  const pending = scoped.filter((r) => r.status === "pending").length;
  const clearAll = () => { setWin(ALL_TIME); setParty([]); setTab("all"); };

  return (
    <div className="space-y-3">
      <div className={PAGE_CARD_CLASS}>
        <PageHeading
          icon={Package}
          title="Things"
          description={<><b>{scoped.length}</b> things in view</>}
          meta={[
            { label: "Value", value: inr(scoped.reduce((s, r) => s + r.amount, 0)) },
            { label: "Pending", value: String(pending), tone: "amber", active: tab === "pending",
              onClick: () => setTab(tab === "pending" ? "all" : "pending") },
          ]}
          actions={<>
            <DateWindowFilter value={win} onChange={setWin} />
            <MultiFilter label="Party" options={optionsFrom(rows, (r) => r.party)} value={party} onChange={setParty} />
            <SortFilter value={sort} onChange={setSort}
              options={[{ value: "newest", label: "Newest first" }, { value: "value", label: "Value: high → low" }]} />
            <Button size="sm"><Plus className="mr-1.5 h-4 w-4" />New thing</Button>
          </>}
        />
        <AppliedFilters
          chips={[...dateChip(win, setWin), ...multiChips("Party", party, setParty)]}
          onClearAll={clearAll}
          resultText={`${shown.length} of ${rows.length}`}
        />
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className={TABLIST_CLASS}>
            {["all", "pending", "done"].map((s) => (
              <TabsTrigger key={s} value={s} className={cn(TAB_CLASS, "gap-1.5")}>{s}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <InsightsRow id="things">
        <TrendPanel title="Value" rows={scoped} dateOf={(r) => r.created_at} measure={(r) => r.amount} format={inr} loading={isLoading} />
        <BreakdownPanel title="By status" rows={scoped} keyOf={(r) => r.status} statusColours
          picked={tab === "all" ? [] : [tab]} onPick={(k) => setTab(tab === k ? "all" : k)} loading={isLoading} />
        <TopPanel title="Top parties" rows={scoped} keyOf={(r) => r.party} measure={(r) => r.amount} format={inr}
          picked={party} onPick={(k) => setParty(party.includes(k) ? party.filter((p) => p !== k) : [...party, k])} loading={isLoading} />
        <ColumnsPanel title="Monthly value" rows={scoped} keyOf={(r) => monthKey(r.created_at)} labelOf={monthLabel}
          measure={(r) => r.amount} format={inr} loading={isLoading} />
        <RhythmPanel title="When they happen" rows={scoped} dateOf={(r) => r.created_at} loading={isLoading} />
        <StatGridPanel title="Sizes" stats={[]} loading={isLoading} />
      </InsightsRow>

      {/* Real grid: one value per column. */}
      <div className="overflow-auto rounded-2xl border bg-card">
        <table className={TABLE_CLASS}>
          <thead className={THEAD_CLASS}>
            <tr>{["Code", "Party", "Status", "Amount", "Date", "Time"].map((h) => <th key={h} className={TH_CLASS}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className={CLICK_ROW_CLASS} onClick={() => setOpen(r)} aria-selected={open?.id === r.id}>
                <td className={TD_CLASS}>{r.code}</td>
                <td className={TD_CLASS}>{r.party}</td>
                <td className={TD_CLASS}><DrawerBadge tone={r.status === "pending" ? "warn" : "good"}>{r.status}</DrawerBadge></td>
                <td className={cn(TD_CLASS, "text-right")}>{inr(r.amount)}</td>
                <td className={TD_CLASS}>{new Date(r.created_at).toLocaleDateString("en-IN")}</td>
                <td className={TD_CLASS}>{new Date(r.created_at).toLocaleTimeString("en-IN", { timeStyle: "short" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DetailDrawer open={!!open} onClose={() => setOpen(null)} title={open?.code} subtitle={open?.party} expandable>
        {open && <>
          <DrawerStats items={[{ label: "Amount", value: inr(open.amount) }, { label: "Status", value: open.status }]} />
          <DrawerFields fields={[{ label: "Party", value: open.party }, { label: "Created", value: open.created_at }]} />
        </>}
      </DetailDrawer>
    </div>
  );
}

declare function fetchThings(): Promise<Thing[]>;
