"use client";
import React, { useState } from "react";
import {
  Truck, Store, ToggleLeft, ToggleRight, Save, RotateCcw,
  Plus, Pencil, Trash2, X, MapPin, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeliveryConfigStore, PickupLocation } from "@/store/deliveryConfigStore";
import { toast } from "sonner";

const PRESETS = [3, 5, 7, 10];

// ── Pickup Location Form (add / edit) ─────────────────────────────────────────
interface LocationFormProps {
  initial?: Partial<PickupLocation>;
  onSave: (data: Omit<PickupLocation, "id">) => void;
  onCancel: () => void;
}

const LocationForm = ({ initial, onSave, onCancel }: LocationFormProps) => {
  const [form, setForm] = useState({
    name:         initial?.name         ?? "",
    address:      initial?.address      ?? "",
    instructions: initial?.instructions ?? "",
    pickupDays:   initial?.pickupDays   ?? "",
    active:       initial?.active       ?? true,
  });

  const handleSave = () => {
    if (!form.name.trim())    { toast.error("Location name is required"); return; }
    if (!form.address.trim()) { toast.error("Address is required"); return; }
    onSave(form);
  };

  return (
    <div className="border border-[#FFD4B3] bg-[#FFF9F0] rounded-xl p-5 space-y-4">
      <h4 className="font-recoleta text-[#222021] text-base">
        {initial?.name ? "Edit Location" : "Add Pickup Location"}
      </h4>
      <div>
        <Label className="font-campton text-[#868686] text-xs mb-1 block">Location Name*</Label>
        <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. FoodGenie HQ" className="font-campton text-sm" />
      </div>
      <div>
        <Label className="font-campton text-[#868686] text-xs mb-1 block">Address*</Label>
        <Input value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} placeholder="123 Main St, Toronto, ON M5V 1A1" className="font-campton text-sm" />
      </div>
      <div>
        <Label className="font-campton text-[#868686] text-xs mb-1 block">Pickup Days / Hours</Label>
        <Input value={form.pickupDays} onChange={(e) => setForm((p) => ({ ...p, pickupDays: e.target.value }))} placeholder="Monday & Thursday, 12pm – 6pm" className="font-campton text-sm" />
      </div>
      <div>
        <Label className="font-campton text-[#868686] text-xs mb-1 block">Pickup Instructions</Label>
        <Input value={form.instructions} onChange={(e) => setForm((p) => ({ ...p, instructions: e.target.value }))} placeholder="Ring the buzzer at the front entrance…" className="font-campton text-sm" />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-campton text-[#222021] text-sm">Active</span>
        <button onClick={() => setForm((p) => ({ ...p, active: !p.active }))} className="cursor-pointer active:scale-95">
          {form.active
            ? <ToggleRight className="w-9 h-9 text-green-500" />
            : <ToggleLeft  className="w-9 h-9 text-[#CCCCCC]" />}
        </button>
      </div>
      <div className="flex gap-2 pt-1">
        <Button onClick={handleSave} className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton text-sm px-5">
          Save location
        </Button>
        <button onClick={onCancel} className="font-campton text-[#868686] text-sm hover:text-[#222021] px-3 cursor-pointer active:scale-95">
          Cancel
        </button>
      </div>
    </div>
  );
};

// ── Main Panel ────────────────────────────────────────────────────────────────
const DeliveryConfigPanel = () => {
  // Delivery fee config
  const freeDeliveryEnabled    = useDeliveryConfigStore((s) => s.freeDeliveryEnabled);
  const freeDeliveryThreshold  = useDeliveryConfigStore((s) => s.freeDeliveryThreshold);
  const standardDeliveryFee    = useDeliveryConfigStore((s) => s.standardDeliveryFee);
  const setFreeDeliveryEnabled  = useDeliveryConfigStore((s) => s.setFreeDeliveryEnabled);
  const setFreeDeliveryThreshold = useDeliveryConfigStore((s) => s.setFreeDeliveryThreshold);
  const setStandardDeliveryFee  = useDeliveryConfigStore((s) => s.setStandardDeliveryFee);

  // Pickup config
  const pickupEnabled          = useDeliveryConfigStore((s) => s.pickupEnabled);
  const pickupLocations        = useDeliveryConfigStore((s) => s.pickupLocations);
  const setPickupEnabled       = useDeliveryConfigStore((s) => s.setPickupEnabled);
  const addPickupLocation      = useDeliveryConfigStore((s) => s.addPickupLocation);
  const updatePickupLocation   = useDeliveryConfigStore((s) => s.updatePickupLocation);
  const removePickupLocation   = useDeliveryConfigStore((s) => s.removePickupLocation);

  // Delivery draft
  const [draft, setDraft] = useState({
    enabled:     freeDeliveryEnabled,
    threshold:   freeDeliveryThreshold,
    standardFee: (standardDeliveryFee / 100).toFixed(2),
  });
  const [dirty, setDirty] = useState(false);
  const update = (patch: Partial<typeof draft>) => { setDraft((p) => ({ ...p, ...patch })); setDirty(true); };

  const handleSaveDelivery = () => {
    const feeInCents = Math.round(parseFloat(draft.standardFee) * 100);
    if (isNaN(feeInCents) || feeInCents < 0) { toast.error("Please enter a valid delivery fee"); return; }
    if (draft.threshold < 1) { toast.error("Minimum meals threshold must be at least 1"); return; }
    setFreeDeliveryEnabled(draft.enabled);
    setFreeDeliveryThreshold(draft.threshold);
    setStandardDeliveryFee(feeInCents);
    setDirty(false);
    toast.success("Delivery settings saved");
  };

  const handleResetDelivery = () => {
    setDraft({ enabled: freeDeliveryEnabled, threshold: freeDeliveryThreshold, standardFee: (standardDeliveryFee / 100).toFixed(2) });
    setDirty(false);
  };

  // Pickup form state
  const [showAddForm, setShowAddForm]       = useState(false);
  const [editingId, setEditingId]           = useState<string | null>(null);

  const handleAddLocation = (data: Omit<PickupLocation, "id">) => {
    addPickupLocation(data);
    setShowAddForm(false);
    toast.success("Pickup location added");
  };

  const handleUpdateLocation = (id: string, data: Omit<PickupLocation, "id">) => {
    updatePickupLocation(id, data);
    setEditingId(null);
    toast.success("Pickup location updated");
  };

  const handleRemove = (id: string) => {
    removePickupLocation(id);
    toast.success("Pickup location removed");
  };

  return (
    <div className="space-y-6 max-w-2xl">

      {/* ────────────────────────────────────────────────────────
          SECTION 1 — Free Delivery
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#F0F0F0]">
          <div className="w-10 h-10 rounded-xl bg-[#FFF9F0] flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5 text-[#FF7C36]" />
          </div>
          <div>
            <h2 className="font-recoleta text-[#222021] text-xl">Free Delivery</h2>
            <p className="font-campton text-[#868686] text-xs">
              Waive the delivery fee when an order meets the minimum meal count
            </p>
          </div>
        </div>

        <div className="px-6 py-6 space-y-8">
          {/* Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-campton text-[#222021] text-sm font-semibold mb-0.5">Free Delivery Promotion</p>
              <p className="font-campton text-[#868686] text-xs">
                {draft.enabled ? "Customers get free delivery when they reach the minimum" : "All delivery orders are charged the standard fee"}
              </p>
            </div>
            <button onClick={() => update({ enabled: !draft.enabled })} className="flex items-center gap-2 focus:outline-none cursor-pointer active:scale-95">
              <span className={`font-campton text-xs font-semibold ${draft.enabled ? "text-green-600" : "text-[#868686]"}`}>
                {draft.enabled ? "ON" : "OFF"}
              </span>
              {draft.enabled ? <ToggleRight className="w-10 h-10 text-green-500" /> : <ToggleLeft className="w-10 h-10 text-[#CCCCCC]" />}
            </button>
          </div>

          {/* Threshold */}
          <div className={draft.enabled ? "" : "opacity-40 pointer-events-none"}>
            <Label className="font-campton text-[#222021] text-sm font-semibold mb-3 block">Minimum Number of Meals</Label>
            <p className="font-campton text-[#868686] text-xs mb-4">
              Based on total quantity in the order (2 × Egusi counts as 2 meals).
            </p>
            <div className="flex gap-2 flex-wrap mb-4">
              {PRESETS.map((n) => (
                <button key={n} onClick={() => update({ threshold: n })}
                  className={`px-4 py-1.5 rounded-full font-campton text-sm border transition-colors cursor-pointer active:scale-95 ${draft.threshold === n ? "bg-[#FF7C36] border-[#FF7C36] text-white" : "border-[#E0E0E0] text-[#868686] hover:border-[#FF7C36] hover:text-[#FF7C36]"}`}>
                  {n} meals
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Input type="number" min={1} value={draft.threshold}
                onChange={(e) => update({ threshold: Math.max(1, parseInt(e.target.value) || 1) })}
                className="font-campton w-28 text-center" />
              <span className="font-campton text-[#868686] text-sm">meals minimum</span>
            </div>
          </div>

          {/* Standard fee */}
          <div>
            <Label className="font-campton text-[#222021] text-sm font-semibold mb-1 block">Standard Delivery Fee</Label>
            <p className="font-campton text-[#868686] text-xs mb-3">Charged when free delivery doesn't apply.</p>
            <div className="flex items-center gap-2">
              <span className="font-campton text-[#868686] text-sm">$</span>
              <Input type="number" min={0} step={0.01} value={draft.standardFee}
                onChange={(e) => update({ standardFee: e.target.value })}
                className="font-campton w-28" />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-[#F9F9F9] rounded-xl p-4 border border-[#F0F0F0]">
            <p className="font-campton text-[#868686] text-xs font-semibold uppercase tracking-wide mb-3">Preview</p>
            <div className="space-y-2">
              {[draft.threshold - 2, draft.threshold - 1, draft.threshold, draft.threshold + 1]
                .filter((n) => n >= 1)
                .map((n) => {
                  const free = draft.enabled && n >= draft.threshold;
                  return (
                    <div key={n} className="flex justify-between">
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
          <div className="flex items-center gap-3">
            <Button onClick={handleSaveDelivery} disabled={!dirty} className="bg-[#FF7C36] hover:bg-[#FF6B1F] text-white font-campton px-8 disabled:opacity-50">
              <Save className="w-4 h-4 mr-2" />Save changes
            </Button>
            {dirty && (
              <button onClick={handleResetDelivery} className="flex items-center gap-1.5 font-campton text-[#868686] text-sm hover:text-[#222021] transition-colors cursor-pointer active:scale-95">
                <RotateCcw className="w-3.5 h-3.5" />Discard
              </button>
            )}
            {!dirty && <p className="font-campton text-green-600 text-xs">✓ Settings saved</p>}
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          SECTION 2 — Pickup
      ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#E0E0E0] overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#F0F0F0]">
          <div className="w-10 h-10 rounded-xl bg-[#F0F4FF] flex items-center justify-center flex-shrink-0">
            <Store className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="font-recoleta text-[#222021] text-xl">Pickup</h2>
            <p className="font-campton text-[#868686] text-xs">
              Allow customers to pick up their orders — no delivery fee charged
            </p>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Pickup enabled toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-campton text-[#222021] text-sm font-semibold mb-0.5">Pickup Option</p>
              <p className="font-campton text-[#868686] text-xs">
                {pickupEnabled ? "Customers can choose pickup at checkout" : "Pickup option is hidden from customers"}
              </p>
            </div>
            <button onClick={() => setPickupEnabled(!pickupEnabled)} className="flex items-center gap-2 focus:outline-none cursor-pointer active:scale-95">
              <span className={`font-campton text-xs font-semibold ${pickupEnabled ? "text-green-600" : "text-[#868686]"}`}>
                {pickupEnabled ? "ON" : "OFF"}
              </span>
              {pickupEnabled ? <ToggleRight className="w-10 h-10 text-green-500" /> : <ToggleLeft className="w-10 h-10 text-[#CCCCCC]" />}
            </button>
          </div>

          {/* Pickup locations list */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="font-campton text-[#222021] text-sm font-semibold">Pickup Locations</Label>
              {!showAddForm && (
                <button onClick={() => { setShowAddForm(true); setEditingId(null); }}
                  className="flex items-center gap-1.5 font-campton text-[#FF7C36] text-sm hover:underline cursor-pointer active:scale-95">
                  <Plus className="w-4 h-4" />Add location
                </button>
              )}
            </div>

            {showAddForm && (
              <div className="mb-4">
                <LocationForm onSave={handleAddLocation} onCancel={() => setShowAddForm(false)} />
              </div>
            )}

            {pickupLocations.length === 0 && !showAddForm ? (
              <div className="border border-dashed border-[#E0E0E0] rounded-xl py-8 text-center">
                <Store className="w-8 h-8 text-[#E0E0E0] mx-auto mb-2" />
                <p className="font-campton text-[#9B9B9B] text-sm">No pickup locations yet</p>
                <button onClick={() => setShowAddForm(true)} className="font-campton text-[#FF7C36] text-xs underline mt-1 cursor-pointer active:scale-95">Add your first location</button>
              </div>
            ) : (
              <div className="space-y-3">
                {pickupLocations.map((loc) => (
                  <div key={loc.id}>
                    {editingId === loc.id ? (
                      <LocationForm
                        initial={loc}
                        onSave={(data) => handleUpdateLocation(loc.id, data)}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : (
                      <div className={`border rounded-xl p-4 ${loc.active ? "border-[#E0E0E0] bg-white" : "border-[#E0E0E0] bg-[#F9F9F9] opacity-60"}`}>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-campton text-[#222021] text-sm font-semibold">{loc.name}</p>
                              <span className={`font-campton text-xs px-2 py-0.5 rounded-full ${loc.active ? "bg-green-100 text-green-700" : "bg-[#F0F0F0] text-[#868686]"}`}>
                                {loc.active ? "Active" : "Inactive"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <MapPin className="w-3 h-3 text-[#868686]" />
                              <p className="font-campton text-[#868686] text-xs">{loc.address}</p>
                            </div>
                            {loc.pickupDays && (
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <Clock className="w-3 h-3 text-[#868686]" />
                                <p className="font-campton text-[#868686] text-xs">{loc.pickupDays}</p>
                              </div>
                            )}
                            {loc.instructions && (
                              <p className="font-campton text-[#9B9B9B] text-xs mt-1 italic">{loc.instructions}</p>
                            )}
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button onClick={() => { setEditingId(loc.id); setShowAddForm(false); }} className="text-[#868686] hover:text-[#FF7C36] transition-colors cursor-pointer active:scale-95">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleRemove(loc.id)} className="text-[#868686] hover:text-red-400 transition-colors cursor-pointer active:scale-95">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfigPanel;
