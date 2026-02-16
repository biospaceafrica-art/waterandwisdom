import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogOut, FileText, Target, DollarSign, TrendingUp } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { RegionHeatmap } from "@/components/RegionHeatmap";
import { SdgExportButton } from "@/components/SdgExportButton";

interface DonationRow {
  id: string;
  amount: number;
  currency: string;
  purpose: string | null;
  sdg_alignment: string[] | null;
  receipt_number: string;
  status: string;
  donated_at: string;
}

interface SdgRow {
  id: string;
  sdg_number: number;
  title: string;
  description: string | null;
  progress_pct: number;
  target_value: number | null;
  current_value: number | null;
  unit: string | null;
  period: string | null;
}

interface ProfileRow {
  display_name: string | null;
  organization: string | null;
}

const Portal = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [donations, setDonations] = useState<DonationRow[]>([]);
  const [sdgReports, setSdgReports] = useState<SdgRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "receipts" | "sdg">("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchData(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async (userId: string) => {
    setLoading(true);
    const [profileRes, donationsRes, sdgRes] = await Promise.all([
      supabase.from("profiles").select("display_name, organization").eq("user_id", userId).single(),
      supabase.from("donations").select("*").eq("user_id", userId).order("donated_at", { ascending: false }),
      supabase.from("sdg_reports").select("*").order("sdg_number"),
    ]);

    if (profileRes.data) setProfile(profileRes.data);
    if (donationsRes.data) setDonations(donationsRes.data as DonationRow[]);
    if (sdgRes.data) setSdgReports(sdgRes.data as SdgRow[]);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const totalDonated = donations.reduce((sum, d) => sum + Number(d.amount), 0);

  if (loading) {
    return (
      <Layout>
        <div className="py-24 text-center text-muted-foreground">Loading your portal…</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="font-heading font-extrabold text-3xl text-foreground">
                Welcome, {profile?.display_name || user?.email}
              </h1>
              {profile?.organization && (
                <p className="text-muted-foreground text-sm mt-1">{profile.organization}</p>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut size={16} className="mr-2" /> Sign Out
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 bg-muted rounded-lg p-1 w-fit">
            {[
              { key: "dashboard" as const, label: "Dashboard", icon: TrendingUp },
              { key: "receipts" as const, label: "Receipts", icon: FileText },
              { key: "sdg" as const, label: "SDG Impact", icon: Target },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-heading font-semibold transition-colors ${
                  activeTab === key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatCard icon={DollarSign} label="Total Donated" value={`₦${totalDonated.toLocaleString()}`} />
                <StatCard icon={FileText} label="Receipts" value={String(donations.length)} />
                <StatCard icon={Target} label="SDGs Supported" value={String(new Set(donations.flatMap(d => d.sdg_alignment || [])).size)} />
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4">Recent Donations</h3>
                {donations.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No donations recorded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {donations.slice(0, 5).map((d) => (
                      <div key={d.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-heading font-semibold text-foreground">{d.purpose || "General Fund"}</p>
                          <p className="text-xs text-muted-foreground">{new Date(d.donated_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-heading font-bold text-foreground">{d.currency} {Number(d.amount).toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">#{d.receipt_number}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Responsiveness Metrics */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4">Our Responsiveness</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <MetricCard label="Avg. Response Time" value="< 2 hours" sublabel="WhatsApp & Email" />
                  <MetricCard label="Weekly Resolution Rate" value="96%" sublabel="Issues resolved within 7 days" />
                  <MetricCard label="Donor Satisfaction" value="4.8/5" sublabel="Based on partner feedback" />
                </div>
              </div>

              {/* Region Heatmap */}
              <RegionHeatmap />
            </motion.div>
          )}

          {/* Receipts Tab */}
          {activeTab === "receipts" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="font-heading font-bold text-lg text-foreground">Donation Receipts</h3>
                  <p className="text-sm text-muted-foreground mt-1">Download your tax-deductible receipts</p>
                </div>
                {donations.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground text-sm">No receipts available.</div>
                ) : (
                  <div className="divide-y divide-border">
                    {donations.map((d) => (
                      <div key={d.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <FileText className="text-secondary" size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-heading font-semibold text-foreground">Receipt #{d.receipt_number}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(d.donated_at).toLocaleDateString()} · {d.purpose || "General Fund"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-heading font-bold text-foreground">{d.currency} {Number(d.amount).toLocaleString()}</p>
                          {d.sdg_alignment && d.sdg_alignment.length > 0 && (
                            <div className="flex gap-1 mt-1 justify-end">
                              {d.sdg_alignment.map((sdg) => (
                                <span key={sdg} className="text-[10px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded font-heading font-semibold">
                                  {sdg}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* SDG Impact Tab */}
          {activeTab === "sdg" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-bold text-lg text-foreground">SDG Alignment Report</h3>
                  {sdgReports.length > 0 && <SdgExportButton reports={sdgReports} />}
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Track how your contributions align with UN Sustainable Development Goals
                </p>

                {sdgReports.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Reports will appear here as data is published by the team.</p>
                ) : (
                  <div className="space-y-6">
                    {sdgReports.map((r) => (
                      <div key={r.id} className="border border-border rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <span className="font-heading font-bold text-secondary text-sm">#{r.sdg_number}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-heading font-bold text-sm text-foreground">{r.title}</h4>
                            {r.period && <p className="text-xs text-muted-foreground">{r.period}</p>}
                          </div>
                          <span className="font-heading font-bold text-secondary text-lg">{r.progress_pct}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${r.progress_pct}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-secondary rounded-full"
                          />
                        </div>
                        {r.description && (
                          <p className="text-xs text-muted-foreground mt-3">{r.description}</p>
                        )}
                        {r.current_value != null && r.target_value != null && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {Number(r.current_value).toLocaleString()} / {Number(r.target_value).toLocaleString()} {r.unit || ""}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
          <Icon className="text-secondary" size={20} />
        </div>
        <span className="text-sm text-muted-foreground font-heading">{label}</span>
      </div>
      <p className="font-heading font-extrabold text-2xl text-foreground">{value}</p>
    </div>
  );
}

function MetricCard({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="bg-muted/50 rounded-xl p-4 text-center">
      <p className="text-xs text-muted-foreground font-heading uppercase tracking-wider mb-1">{label}</p>
      <p className="font-heading font-extrabold text-xl text-secondary">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
    </div>
  );
}

export default Portal;
