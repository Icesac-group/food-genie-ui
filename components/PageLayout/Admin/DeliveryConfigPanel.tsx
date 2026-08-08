"use client";
import React, { useState } from "react";
import { Truck, ToggleLeft, ToggleRight, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeliveryConfigStore } from "@/store/deliveryConfigStore";
import { toast } from "sonner";

<<<<<<< HEAD
const PRESET_THRESHOLDS = [3, 5, 7, 10];
=======
const PRESETS = [3, 5, 7, 10];
>>>>>>> 0af66188665b452134b1e92be9ad0fba5ffe76f3

const DeliveryConfigPanel = () => {
  const freeDeliveryEnabled   = useDeliveryConfigStore((s) => s.freeDeliveryEnabled);
  const freeDeliveryThreshold = useDeliveryConfigStore((s) => s.freeDeliveryThreshold);
  const standardDeliveryFee   = useDeliveryConfigStore((s) => s.standardDeliveryFee);
  const setFreeDeliveryEnabled   = useDeliveryConfigStore((s) => s.setFreeDeliveryEnabled);
  const setFreeDeliveryThreshold = useDeliveryConfigStore((s) => s.setFreeDeliveryThreshold);
  const setStandardDeliveryFee   = useDeliveryConfigStore((s) => s.setStandardDeliveryFee);

<<<<<<< HEAD
  // Local draft state — changes are staged here until Save is clicked
  const [draft, setDraft] = useState({
    enabled: freeDeliveryEnabled,
    threshold: freeDeliveryThreshold,
    standardFee: (standardDeliveryFee / 100).toFixed(2), // display in dollars
  });
  const [dirty, setDirty] = useState(false);

  const update = (patch: Partial<typeof draft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  };

  const handleSave = () => {
    const feeInCents = Math.round(parseFloat(draft.standardFee) * 100);
    if (isNaN(feeInCents) || feeInCents < 0) {
      toast.error("Please enter a valid delivery fee");
      return;
    }
    if (draft.threshold < 1) {
      toast.error("Minimum meals threshold must be at least 1");
      return;
    }
=======
  const [draft, setDraft] = useState({ enabled: freeDeliveryEnabled, threshold: freeDeliveryThreshold, standardFee: (standardDeliveryFee / 100).toFixed(2) });
  const [dirty, setDirty] = useState(false);

  const update = (patch: Partial<typeof draft>) => { setDraft((p) => ({ ...p, ...patch })); setDirty(true); };

  const handleSave = () => {
    const feeInCents = Math.round(parseFloat(draft.standardFee) * 100);
    if (isNaN(feeInCents) || feeInCents < 0) { toast.error("Please enter a valid delivery fee"); return; }
    if (draft.threshold < 1) { toast.error("Minimum meals threshold must be at least 1"); return; }
>>>>>>> 0af66188665b452134b1e92be9ad0fba5ffe76f3
    setFreeDeliveryEnabled(draft.enabled);
    setFreeDeliveryThreshold(draft.threshold);
    setStandardDeliveryFee(feeInCents);
    setDirty(false);
    toast.success("Delivery settings saved");
  };

<<<<<<< HEAD
  const handleReset = () => {
    setDraft({
      enabled: freeDeliveryEnabled,
      threshold: freeDeliveryThreshold,
      standardFee: (standardDeliveryFee / 100).toFixed(2),
    });
    setDirty(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden max-w-2xl">
      {/* Panel header */}
=======
  const handleReset = () => { setDraft({ enabled: freeDeliveryEnabled, threshold: freeDeliveryThreshold, standardFee: (standardDeliveryFee / 100).toFixed(2) }); setDirty(false); };

  return (
    <div className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden max-w-2xl">
>>>>>>> 0af66188665b452134b1e92be9ad0fba5ffe76f3
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#F0F0F0]">
        <div className="w-10 h-10 rounded-xl bg-[#FFF9F0] flex items-center justify-center flex-shrink-0">
          <Truck className="w-5 h-5 text-[#FF7C36]" />
        </div>
        <div>
<<<<<<< HEAD
          <h2 className="font-recoleta text-[#222021] text-xl">
            Free Delivery
          </h2>
          <p className="font-campton text-[#868686] text-xs">
            Automatically waive the delivery fee when an order meets the
            minimum meal count
          </p>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">

        {/* ── Toggle ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-campton text-[#222021] text-sm font-semibold mb-0.5">
              Free Delivery
            </p>
            <p className="font-campton text-[#868686] text-xs">
              {draft.enabled
                ? "Customers get free delivery when they reach the minimum"
                : "All orders are charged the standard delivery fee"}
            </p>
          </div>
          <button
            onClick={() => update({ enabled: !draft.enabled })}
            className="flex items-center gap-2 focus:outline-none"
            aria-label={`Free delivery is ${draft.enabled ? "on" : "off"}. Click to toggle.`}
          >
            <span
              className={`font-campton text-xs font-semibold ${
                draft.enabled ? "text-green-600" : "text-[#868686]"
              }`}
            >
              {draft.enabled ? "ON" : "OFF"}
            </span>
            {draft.enabled ? (
              <ToggleRight className="w-10 h-10 text-green-500" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-[#CCCCCC]" />
            )}
          </button>
        </div>

        {/* ── Threshold ── */}
        <div className={draft.enabled ? "" : "opacity-40 pointer-events-none"}>
          <Label className="font-campton text-[#222021] text-sm font-semibold mb-3 block">
            Minimum Number of Meals
          </Label>
          <p className="font-campton text-[#868686] text-xs mb-4">
            Based on total quantity in the order (e.g. 2 × Egusi counts as 2
            meals, not 1).
          </p>

          {/* Preset chips */}
          <div className="flex gap-2 flex-wrap mb-4">
            {PRESET_THRESHOLDS.map((n) => (
              <button
                key={n}
                onClick={() => update({ threshold: n })}
                className={`px-4 py-1.5 rounded-full font-campton text-sm border transition-colors ${
                  draft.threshold === n
                    ? "bg-[#FF7C36] border-[#FF7C36] text-white"
                    : "border-[#E0E0E0] text-[#868686] hover:border-[#FF7C36] hover:text-[#FF7C36]"
                }`}
              >
=======
          <h2 className="font-recoleta text-[#222021] text-xl">Free Delivery</h2>
          <p className="font-campton text-[#868686] text-xs">Automatically waive the delivery fee when an order meets the minimum meal count</p>
        </div>
      </div>
      <div className="px-6 py-6 space-y-8">
        {/* Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-campton text-[#222021] text-sm font-semibold mb-0.5">Free Delivery</p>
            <p className="font-campton text-[#868686] text-xs">{draft.enabled ? "Customers get free delivery when they reach the minimum" : "All orders are charged the standard delivery fee"}</p>
          </div>
          <button onClick={() => update({ enabled: !draft.enabled })} className="flex items-center gap-2 focus:outline-none" aria-label={`Free delivery is ${draft.enabled ? "on" : "off"}`}>
            <span className={`font-campton text-xs font-semibold ${draft.enabled ? "text-green-600" : "text-[#868686]"}`}>{draft.enabled ? "ON" : "OFF"}</span>
            {draft.enabled ? <ToggleRight className="w-10 h-10 text-green-500" /> : <ToggleLeft className="w-10 h-10 text-[#CCCCCC]" />}
          </button>
        </div>
        {/* Threshold */}
        <div className={draft.enabled ? "" : "opacity-40 pointer-events-none"}>
          <Label className="font-campton text-[#222021] text-sm font-semibold mb-3 block">Minimum Number of Meals</Label>
          <p className="font-campton text-[#868686] text-xs mb-4">Based on total quantity in the order (e.g. 2 × Egusi counts as 2 meals).</p>
          <div className="flex gap-2 flex-wrap mb-4">
            {PRESETS.map((n) => (
              <button key={n} onClick={() => update({ threshold: n })}
                className={`px-4 py-1.5 rounded-full font-campton text-sm border transition-colors ${draft.threshold === n ? "bg-[#FF7C36] border-[#FF7C36] text-white" : "border-[#E0E0E0] text-[#868686] hover:border-[#FF7C36] hover:text-[#FF7C36]"}`}>
>>>>>>> 0af66188665b452134b1e92be9ad0fba5ffe76f3
                {n} meals
              </button>
            ))}
          </div>
<<<<<<< HEAD

          {/* Custom input */}
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min={1}
              value={draft.threshold}
              onChange={(e) =>
                update({ threshold: Math.max(1, parseInt(e.target.value) || 1) })
              }
              className="font-campton w-28 text-center"
              aria-label="Custom minimum meals threshold"
            />
            <span className="font-campton text-[#868686] text-sm">
              meals minimum
            </span>
          </div>
        </div>

        {/* ── Standard delivery fee ── */}
        <div>
          <Label className="font-campton text-[#222021] text-sm font-semibold mb-1 block">
            Standard Delivery Fee
          </Label>
          <p className="font-campton text-[#868686] text-xs mb-3">
            Charged when free delivery doesn't apply.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-campton text-[#868686] text-sm">$</span>
            <Input
              type="number"
              min={0}
              step={0.01}
              value={draft.standardFee}
              onChange={(e) => update({ standardFee: e.target.value })}
              className="font-campton w-28"
              aria-label="Standard delivery fee in dollars"
            />
          </div>
        </div>

        {/* ── Preview ── */}
        <div className="bg-[#F9F9F9] rounded-xl p-4 border border-[#F0F0F0]">
          <p className="font-campton text-[#868686] text-xs font-semibold uppercase tracking-wide mb-3">
            Preview
          </p>
          <div className="space-y-2">
            {[
              draft.threshold - 2,
              draft.threshold - 1,
              draft.threshold,
              draft.threshold + 1,
            ]
              .filter((n) => n >= 1)
              .map((n) => {
                const free = draft.enabled && n >= draft.threshold;
                return (
                  <div key={n} className="flex items-center justify-between">
                    <span className="font-campton text-[#868686] text-xs">
                      {n} {n === 1 ? "meal" : "meals"}
                    </span>
                    <span
                      className={`font-campton text-xs font-semibold ${
                        free ? "text-green-600" : "text-[#222021]"
                      }`}
                    >
                      {free
                        ? "FREE delivery 🎉"
                        : `$${parseFloat(draft.standardFee || "0").toFixed(2)} delivery`}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            onClick={handleSave}
            disabled={!dirty}
            className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton px-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            Save changes
          </Button>
          {dirty && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 font-campton text-[#868686] text-sm hover:text-[#222021] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Discard
            </button>
          )}
          {!dirty && (
            <p className="font-campton text-green-600 text-xs flex items-center gap-1">
              <span>✓</span> Settings saved
            </p>
          )}
=======
          <div className="flex items-center gap-3">
            <Input type="number" min={1} value={draft.threshold} onChange={(e) => update({ threshold: Math.max(1, parseInt(e.target.value) || 1) })} className="font-campton w-28 text-center" />
            <span className="font-campton text-[#868686] text-sm">meals minimum</span>
          </div>
        </div>
        {/* Fee */}
        <div>
          <Label className="font-campton text-[#222021] text-sm font-semibold mb-1 block">Standard Delivery Fee</Label>
          <p className="font-campton text-[#868686] text-xs mb-3">Charged when free delivery doesn't apply.</p>
          <div className="flex items-center gap-2">
            <span className="font-campton text-[#868686] text-sm">$</span>
            <Input type="number" min={0} step={0.01} value={draft.standardFee} onChange={(e) => update({ standardFee: e.target.value })} className="font-campton w-28" />
          </div>
        </div>
        {/* Preview */}
        <div className="bg-[#F9F9F9] rounded-xl p-4 border border-[#F0F0F0]">
          <p className="font-campton text-[#868686] text-xs font-semibold uppercase tracking-wide mb-3">Preview</p>
          <div className="space-y-2">
            {[draft.threshold - 2, draft.threshold - 1, draft.threshold, draft.threshold + 1].filter((n) => n >= 1).map((n) => {
              const free = draft.enabled && n >= draft.threshold;
              return (
                <div key={n} className="flex items-center justify-between">
                  <span className="font-campton text-[#868686] text-xs">{n} {n === 1 ? "meal" : "meals"}</span>
                  <span className={`font-campton text-xs font-semibold ${free ? "text-green-600" : "text-[#222021]"}`}>
                    {free ? "FREE delivery 🎉" : `$${parseFloat(draft.standardFee || "0").toFixed(2)} delivery`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button onClick={handleSave} disabled={!dirty} className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton px-8 disabled:opacity-50">
            <Save className="w-4 h-4 mr-2" />Save changes
          </Button>
          {dirty && <button onClick={handleReset} className="flex items-center gap-1.5 font-campton text-[#868686] text-sm hover:text-[#222021] transition-colors"><RotateCcw className="w-3.5 h-3.5" />Discard</button>}
          {!dirty && <p className="font-campton text-green-600 text-xs flex items-center gap-1"><span>✓</span> Settings saved</p>}
>>>>>>> 0af66188665b452134b1e92be9ad0fba5ffe76f3
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfigPanel;
