document.getElementById('year').textContent = new Date().getFullYear();

// theme toggle
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const ttLabel = themeToggle.querySelector('.tt-label');

function applyTheme(theme){
if(theme === 'dark'){
    root.setAttribute('data-theme', 'dark');
    ttLabel.textContent = 'Light';
    themeToggle.setAttribute('aria-label', 'Switch to light theme');
} else {
    root.removeAttribute('data-theme');
    ttLabel.textContent = 'Dark';
    themeToggle.setAttribute('aria-label', 'Switch to dark theme');
}
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('gdc-theme'); } catch(e) {}
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeToggle.addEventListener('click', () => {
const isDark = root.getAttribute('data-theme') === 'dark';
const next = isDark ? 'light' : 'dark';
applyTheme(next);
try { localStorage.setItem('gdc-theme', next); } catch(e) {}
});

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navlinks = document.getElementById('navlinks');
navToggle.addEventListener('click', () => navlinks.classList.toggle('open'));
navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));

// project register data
const projects = [
// Defense
{n:"D-01", name:"110m Clear-Span Hangar, Indian Air Force", loc:"AFS Ambala", tag:"Defense"},
{n:"D-02", name:"2× 90m Clear-Span Hangars for Boeing", loc:"Palam", tag:"Defense"},
{n:"D-03", name:"75m Clear-Span Hangar, IAF", loc:"AFS Thanjavur", tag:"Defense"},
{n:"D-04", name:"75m Clear-Span Hangar, IAF", loc:"AFS Sirsa", tag:"Defense"},
{n:"D-05", name:"72m Clear-Span Hangar, IAF", loc:"AFS Bagdogra", tag:"Defense"},
{n:"D-06", name:"70m Clear-Span Hangar, IAF", loc:"AFS Car Nicobar, Andaman", tag:"Defense"},
{n:"D-07", name:"60m Clear-Span Hangar, Indian Coast Guard", loc:"Port Blair, Andaman", tag:"Defense"},
{n:"D-08", name:"45m Clear-Span Hangar, Indian Navy", loc:"Vizag", tag:"Defense"},
{n:"D-09", name:"50m Clear-Span Hangar, IAF", loc:"AFS Manasbal, J&K", tag:"Defense"},

// Metro
{n:"M-01", name:"Depot Buildings — Workshop, Stabling Shed, Pit Wheel Lathe", loc:"Rapid Metro, Gurgaon", tag:"Metro"},
{n:"M-02", name:"Complete Depot Buildings", loc:"Patna Metro", tag:"Metro"},
{n:"M-03", name:"Workshop Extension, Yamuna Depot (DMRC)", loc:"New Delhi", tag:"Metro"},

// Auditorium / Large span
{n:"A-01", name:'"Nautanki Mahal" — Kingdom of Dreams', loc:"Gurgaon", tag:"Auditorium"},
{n:"A-02", name:'"Sho-Shaa" Theatre, Kingdom of Dreams', loc:"Gurgaon", tag:"Auditorium"},
{n:"A-03", name:"Stage — 2010 Commonwealth Games Opening Ceremony", loc:"New Delhi", tag:"Auditorium"},
{n:"A-04", name:"75m×90m Pavilions, Milan Mela Project", loc:"Kolkata", tag:"Auditorium"},
{n:"A-05", name:"65m High Steel Clock Tower, Milan Mela Ground", loc:"Kolkata", tag:"Auditorium"},
{n:"A-06", name:"Aerospace Museum", loc:"Palam, New Delhi", tag:"Auditorium"},
{n:"A-07", name:"3,000-Capacity Hall, Bharat Soka Gakkai", loc:"Bilaspur, Haryana", tag:"Auditorium"},
{n:"A-08", name:"Agra International Trade Centre — 70K+50K sft halls", loc:"Agra", tag:"Auditorium"},
{n:"A-09", name:"16.5m Cantilever Stadium Roof, Jalpaiguri Sports Complex", loc:"West Bengal", tag:"Auditorium"},

// Power
{n:"P-01", name:"220 KV Substation, DHVBN", loc:"Manesar, Gurgaon", tag:"Power"},
{n:"P-02", name:"220 KV Substation, DHVBN", loc:"Rai, Sonipat", tag:"Power"},
{n:"P-03", name:"18 MW Straw-Fired Power Plant, Sukhbir Agro Energy", loc:"Ferozpur, Punjab", tag:"Power"},
{n:"P-04", name:"66/11kV GIS Substation, TPDDL Delhi (for Siemens)", loc:"Delhi", tag:"Power"},

// Warehouse
{n:"W-01", name:"4.0 Lac sft Integrated ASRS Warehouse, ITC", loc:"Trichy", tag:"Warehouse"},
{n:"W-02", name:"4.0 Lac sft Integrated ASRS Warehouse, ITC", loc:"Kapurthala", tag:"Warehouse"},
{n:"W-03", name:"9 Warehouses, CONCOR", loc:"Multiple sites", tag:"Warehouse"},
{n:"W-04", name:"2.06 Lac sft Warehouse, VIP", loc:"Srirampur, Hooghly, WB", tag:"Warehouse"},
{n:"W-05", name:"1.92 Lac sft Warehouse, Firstplace", loc:"Talegaon, Pune", tag:"Warehouse"},
{n:"W-06", name:"1.1 Lac sft Warehouse, Daikin", loc:"Neemrana", tag:"Warehouse"},

// Food & Silo
{n:"F-01", name:"Rice Mill, Pre-Cleaning &amp; Conveyor System, Al Dahra Group", loc:"Abu Dhabi, UAE", tag:"Food"},
{n:"F-02", name:"Complete Rice Mill, Silo &amp; Packing Plant, Sukhbir Agro", loc:"Shahjahanpur, UP", tag:"Food"},
{n:"F-03", name:"Sortex &amp; Rice Conveying Support, 120 MTPH Mill, KRBL", loc:"Dhuri, Punjab", tag:"Food"},
{n:"F-04", name:"Rice Processing Unit — Sortex, Boiler House, Chimney", loc:"Nigeria", tag:"Food"},
{n:"F-05", name:"Rice Processing Unit — Sortex, Boiler House, Chimney", loc:"Ghana", tag:"Food"},
{n:"F-06", name:"CA Cold Storage, Fruit Master / Valley Fresh / Kashmir Premium Apple", loc:"Pulwama, J&K", tag:"Food"},
{n:"F-07", name:"50K MTon Wheat Storage Complex, Om Metals", loc:"Palanpur, Gujarat", tag:"Food"},
{n:"F-08", name:"50K MTon Wheat Storage Complex, Veerprabhu Marketing", loc:"Fatehpur, UP", tag:"Food"},
{n:"F-09", name:"50K MTon Wheat Storage Complex, RCC Hari Agro", loc:"Agra", tag:"Food"},

// Offices & institutional
{n:"O-01", name:"4× G+4 Institutional Buildings, Centre of Excellence", loc:"Waknaghat, Shimla, HP", tag:"Offices"},
{n:"O-02", name:"Basement+G+6 HQ, Uttarakhand Jal Vidyut Nigam", loc:"Dehradun", tag:"Offices"},
{n:"O-03", name:"G+2 School Building, DPS Jhansi (55,000 sft)", loc:"Jhansi", tag:"Offices"},
{n:"O-04", name:"2-Storey Office Complex, NSG", loc:"Mumbai", tag:"Offices"},
{n:"O-05", name:"2-Storey Office Complex, NSG", loc:"Kolkata", tag:"Offices"},
{n:"O-06", name:"G+3 Library Building", loc:"Gotri, Baroda", tag:"Offices"},
{n:"O-07", name:"8× G+16 Towers, Seven Lamps Project, Vatika India Next", loc:"Gurgaon", tag:"Offices"},
{n:"O-08", name:"G+7 Office Building, LIC India", loc:"Ghaziabad", tag:"Offices"},

// PEB industrial
{n:"I-01", name:"GA CMA / Shop / PDC Buildings, General Motors", loc:"Talegaon, Maharashtra", tag:"PEB"},
{n:"I-02", name:"Factory Complex, Bosch", loc:"Manesar &amp; Sitarganj", tag:"PEB"},
{n:"I-03", name:"Extension Shed, TATA (TSPDL)", loc:"Pantnagar &amp; Ranjangaon", tag:"PEB"},
{n:"I-04", name:"Factory, RICO Auto Ltd.", loc:"Gurgaon", tag:"PEB"},
{n:"I-05", name:"Factory, Bajaj Auto Ltd.", loc:"Binola", tag:"PEB"},
{n:"I-06", name:"Factory, Sheela Foam Ltd.", loc:"Greater Noida", tag:"PEB"},
{n:"I-07", name:"Wagon Repair Workshop, Southern Railway", loc:"Chennai", tag:"PEB"},
{n:"I-08", name:"4-Storey Factory, Advance Tech Ltd.", loc:"Manesar, Gurgaon", tag:"PEB"},

// Cement / heavy industrial
{n:"C-01", name:"Extension Works, Ras Al Khaima White Cement", loc:"Ras Al Khaimah, UAE", tag:"Cement"},
{n:"C-02", name:"125m High Preheater Building, Zuary Cement", loc:"Yarraguntla, AP", tag:"Cement"},
{n:"C-03", name:"115m High Preheater Building, JSW Cement", loc:"Nandyal", tag:"Cement"},
{n:"C-04", name:"650m Long Wagon Loader, Zuary Cement", loc:"Yarraguntla, AP", tag:"Cement"},
{n:"C-05", name:"Clinker Transport — Conveyor Gallery &amp; Transfer Towers, Aditya Birla", loc:"Shambhupura, Rajasthan", tag:"Cement"},
{n:"C-06", name:"Complete Electrical Control Building, JSW", loc:"Toranagallu, Karnataka", tag:"Cement"},
{n:"C-07", name:"Design Review — Klin Foundation &amp; Preheater Tower, Al Jouf Cement", loc:"Saudi Arabia", tag:"Cement"},
{n:"C-08", name:"Wagon Loading System, Gharibwal Cement", loc:"Lahore, Pakistan", tag:"Cement"},

// Mining
{n:"MI-01", name:"Screen House, Crusher House &amp; Conveyor Galleries, TISCO", loc:"Noamundi Iron Ore Mines", tag:"Mining"},
{n:"MI-02", name:"25 Ton Dumper Tipper Platform, Metso Minerals", loc:"India", tag:"Mining"},
{n:"MI-03", name:"Electrical Control &amp; Transformer Building", loc:"Noamundi", tag:"Mining"},

// Masts
{n:"H-01", name:"25m &amp; 20m High Mast, Substation", loc:"Mundra, Gujarat", tag:"Masts"},
{n:"H-02", name:"20m High Mast, Pragati Maidan", loc:"New Delhi", tag:"Masts"},
{n:"H-03", name:"16m High Mast, IGI Airport", loc:"New Delhi", tag:"Masts"},
{n:"H-04", name:"15m &amp; 18m Mid-Hinged Mast, Floodlight Foundation", loc:"Mauritius", tag:"Masts"},
{n:"H-05", name:"22m High National Flagpole, SAIL Bhawan", loc:"Lodhi Road, New Delhi", tag:"Masts"},
];

const tagLabels = {
Defense:"Defense", Metro:"Metro/Rail", Auditorium:"Large Span", Power:"Power",
Warehouse:"Warehouse", Food:"Food/Silo", Offices:"Institutional", PEB:"PEB Industrial",
Cement:"Heavy Industrial", Mining:"Mining", Masts:"High Mast"
};

const registerBody = document.getElementById('registerBody');
function render(filter){
const list = filter === 'all' ? projects : projects.filter(p => p.tag === filter);
registerBody.innerHTML = list.map(p => `
    <div class="register-row">
    <span class="reg-no mono">${p.n}</span>
    <span class="reg-name">${p.name}</span>
    <span class="reg-loc">${p.loc}</span>
    <span class="reg-tag">${tagLabels[p.tag]}</span>
    </div>
`).join('');
}
render('all');

document.querySelectorAll('.filter-btn').forEach(btn => {
btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.filter);
});
});
