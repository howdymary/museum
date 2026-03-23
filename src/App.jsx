import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const ESSAY = [
  {
    "act": "I",
    "title": "THE NEW MATH",
    "paras": [
      "When I went through basic training in 2014, the Army issued me an M16. The same rifle, in its essential design, that infantrymen carried in Vietnam fifty years earlier. The M4, a shorter and lighter variant, had become standard issue during Iraq and Afghanistan, but the operating principle was identical: a soldier, a trigger, a bullet. Across sixty years, the basic unit of American warfare remained a human being holding a gun.",
      "That unit is now obsolete.",
      "In late 2025, a single Ukrainian unmanned ground vehicle, a Droid TW 12.7 armed with a .50 caliber machine gun, held a front-line position in eastern Ukraine for forty-five days. No soldiers. It received maintenance every forty-eight hours and otherwise operated alone, controlled remotely or running on artificial intelligence. Mykola Zinkevych of Ukraine's Third Army Corps put it simply: robots do not bleed. By January 2026, Ukraine had conducted nearly 7,500 robotics operations in a single month. Fifteen thousand ground robots are now deployed across the front. These are not experiments.",
      "Then, in February, two humanoid robots arrived at the front. Phantom MK-1 units, built by a San Francisco startup called Foundation. They stand five foot nine. They walk on two legs. They carry rifles. They are, as far as anyone has been able to document, the first humanoid robots ever deployed to a warzone. Foundation's co-founder, Mike LeBlanc, is a fourteen-year Marine Corps veteran with multiple combat tours in Iraq and Afghanistan. He went to Ukraine and what he found there changed how he talks about war. \"It's a complete robot war,\" he told Time. \"The robot is the primary fighter and the humans are in support. It is the exact opposite of when I was in Afghanistan: the humans were everything, and we had supplementary tools.\"",
      "Read that again. The robot is the primary fighter. The human is in support.",
      "As of this week, Ukrainian airborne assault forces have begun testing powered exoskeleton frames on the front lines near Pokrovsk. Soldiers of the 147th Separate Artillery Brigade, 7th Air Assault Corps, load shells into Bohdana howitzers wearing metal-and-polymer rigs that reduce strain by thirty percent and allow movement at twenty kilometers per hour. The frames look like something from a film that hasn't been made yet. Bulky, angular, strapped over fatigues, hydraulic-assisted joints at the knees and shoulders. The soldiers wearing them are not quite soldiers and not quite machines. They are something in between, and nobody has a word for it yet.",
      "Meanwhile, across the line, Russia is pulling T-54 and T-55 tanks out of cold storage in Siberia. The T-54 weighs thirty-six tons. It was designed in 1946, entered production in 1947, and fought in the Korean War. Its turret is a low steel dome with a 100mm rifled gun. It looks exactly like what it is: a machine from the middle of the twentieth century, built by engineers who had never seen a transistor. Russia is loading these onto flatcars and shipping them west because the modern tanks, the T-72s, the T-80s, the T-90s, keep dying.",
      "They keep dying because of a device that costs less than a high-end smartphone.",
      "A first-person-view drone, an FPV, is a hobbyist racing quadcopter modified for war. Four rotors, a camera, a battery, an RPG warhead zip-tied to the belly. You can build one with off-the-shelf parts and a soldering iron in a few hours. It costs between three hundred and five hundred dollars. The tank it kills costs four million. Ukraine now produces nine thousand of these per day, a manufacturing throughput that rivals consumer electronics. An entire military branch, the Unmanned Systems Forces, exists solely for drone warfare. By early 2025, FPV drones accounted for an estimated sixty-five percent of all Russian tank losses. Ten thousand drones for the price of one tank. The tank gets one life. The drones keep coming.",
      "And then there is the Shahed-136. Iran's delta-winged loitering munition, three and a half meters long, launched in swarms of five from the back of a flatbed truck. A small piston engine gives it the buzzing hum Ukrainians call \"the flying moped.\" It costs between twenty and fifty thousand dollars. Its warhead carries the explosive equivalent of five 155mm artillery shells. It flies over eighteen hundred kilometers. When a Patriot battery fires a PAC-3 MSE interceptor to shoot one down, that interceptor costs four million dollars. Fire fifty Shaheds at a target, one and a half million dollars total, and force two hundred million in defensive spending. Even if every drone is intercepted, you win the math. They are never all intercepted.",
      "A thirty-six-ton tank from 1947, hauled out of Siberian permafrost, killed by a four-hundred-dollar plastic quadcopter guided by a twenty-two-year-old in goggles sitting in a basement three kilometers away. The most expensive military in human history burning through its ammunition faster than it can manufacture replacements, defending against weapons built in garages. The old equation, spend more to win more, has been inverted. The cheap side is winning the arithmetic. And the expensive side has not started to reckon with what that means for everything it has built."
    ]
  },
  {
    "act": "II",
    "title": "EYES EVERYWHERE",
    "paras": [
      "Clausewitz called it the fog of war: the irreducible uncertainty of combat, the impossibility of knowing what lies beyond the horizon of your own position. For two centuries, that fog governed everything. Commanders decided blind. Soldiers fought without context. The public learned what happened weeks later, filtered through dispatches and censors.",
      "The fog is gone. What replaced it is a flood.",
      "In Ukraine, FPV drone operators film their kills and upload them to Telegram within minutes. The footage is not the sanitized green-tint night vision of the Gulf War or the shaky embedded-journalist video from Iraq. It is the literal first-person perspective of a weapon flying into a human being. Approach. Impact. Scroll. You watch it on your phone while eating breakfast and then you keep scrolling.",
      "Earlier this year, three bloodied Russian soldiers stumbled out of a bombed structure and raised their hands in surrender. They were not surrendering to enemy troops. They were surrendering to an armed Ukrainian ground robot, a small unmanned vehicle with a machine gun, operated by someone kilometers away. The footage circled the globe in hours. Humans capitulating to a machine. Five years ago it would have been the plot of a film. Now it sits between an ad for running shoes and someone's vacation photos.",
      "A TikTok account belonging to a US Army veteran posted a simple challenge to his followers: imagine an American soldier, nineteen years old, from Texas, crying for his mother on the ground in Iran, filmed by a drone, uploaded before his family is notified. \"This is what's coming,\" he said. \"This is what your feed is going to look like.\" The video got thirty million views.",
      "On March 4, an Israeli F-35I Adir became the first F-35 to shoot down a manned aircraft in combat, killing an Iranian Yak-130 over Tehran's airspace. The IDF published footage within hours. An aviation milestone, confirmed and consumed in the time it takes to eat lunch.",
      "But Iran is fighting back in the same arena. The Islamic Republic, its parliament, its IRGC commanders, its state media, all post directly on X, the same platform where Trump announces policy at 2 AM. Iran's foreign policy advisor Kamal Kharazi appeared on CNN, filmed inside Iran, and told Frederik Pleitgen that claims of degraded Iranian capability were a \"false narrative.\" He was measured. Specific. He looked like a diplomat. On the same day, Iran's Parliament Speaker Mohammad Bagher Ghalibaf posted operational analysis on X in English: \"If the Israeli regime is unable to intercept missiles in the heavily protected Dimona area, it is, operationally, a sign of entering a new phase of the battle.\" A government at war, speaking in real time to the enemy's population, on the enemy's own platforms. There is no historical precedent for this.",
      "The White House responded with meme warfare. On March 5, the official White House X account posted a video of real Iranian strike footage overlaid with Call of Duty kill-score graphics, set to Childish Gambino's \"Bonfire.\" Fifty-eight million views. The next day, SpongeBob: \"Want to see me do it again?\" Eighteen million views. Then Mortal Kombat: \"FLAWLESS VICTORY,\" spliced with Top Gun, Iron Man, and Braveheart over real bombing runs. Then Grand Theft Auto: \"Ah shit, here we go again,\" over footage of a US strike on a box truck. This is how the government of the United States communicates an active war to its own citizens. The press conference is dead. The address to Congress is dead. The embed program is dead. What remains is a content strategy.",
      "Retired Admiral Montgomery publicly assessed Kharg Island's vulnerability on social media. Lieutenant General Hodges posted analysis of allied perception. Defense analysts, OSINT accounts, and retired intelligence officers provided real-time strategic commentary on X, all of it publicly visible, all of it available to Iran. The old hierarchy, where classified intelligence flowed up to decision-makers and curated information flowed down to the public, has collapsed into a single noisy feed where everyone talks to everyone, adversary included, simultaneously."
    ]
  },
  {
    "act": "III",
    "title": "THE DIRECT CHANNEL",
    "paras": [
      "Consider one variable across six decades of American warfare: the time between an event on the battlefield and an American civilian seeing it.",
      "Vietnam: three days. Film reels shipped by cargo plane, developed in labs, edited in studios, broadcast on the evening news. Walter Cronkite's editorial about the Tet Offensive, the one that reportedly made Johnson say \"if I've lost Cronkite, I've lost Middle America,\" aired a full month after the offensive began. A month. That was the speed of narrative.",
      "Gulf War, 1991: roughly live. CNN broadcast from Baghdad as cruise missiles struck. Green-tinted night vision, Wolf Blitzer in a flak jacket, war as prime-time spectacle. Live but curated. You saw what the Pentagon wanted you to see.",
      "Iraq, 2003: hours. Embedded journalists filed from inside units. Al Jazeera broadcast what American networks would not. Two versions of the same war playing to two different audiences.",
      "Ukraine, 2022 onward: minutes. Soldiers posting to Telegram. Drone operators streaming kills. Zelensky addressing the world from his iPhone. No intermediaries. No editors.",
      "Iran, 2026: zero. Negative. The perception arrives before the event is understood.",
      "On the morning of February 28, 2026, as American cruise missiles struck targets across Iran in the opening hours of Operation Epic Fury, millions of Iranians received push notifications on their smartphones. The first message arrived at 9:52 a.m. Tehran time, shortly after residents heard the first explosions. It read: help has arrived. Ten minutes later, a second message urged military personnel to lay down their arms in exchange for amnesty. A third exhorted listeners to join \"the forces of liberation.\" The messages came through BadeSaba Calendar, a widely used Islamic prayer-timing application with more than thirty-seven million downloads. A devotional app, hacked and weaponized in real time, delivering psychological warfare to millions of people in their most private digital space while missiles were still in the air.",
      "Within thirty minutes, Iran's government dropped internet connectivity to four percent nationwide, according to NetBlocks. But the messages had already landed. The damage was done in half an hour. By the time the network went dark, five million people had already read a message from an enemy that arrived through the same app they used to time their prayers.",
      "On the other side of the information war, Kharazi appeared on CNN and calmly disputed the Pentagon's narrative. On Truth Social, the President called allies \"cowardly\" and wrote \"my attitude is: we don't need anybody.\" He posted this while zero allied nations had agreed to join the campaign. Germany's defense minister said publicly: \"It is not our war.\" France's former ambassador said allies would not be at Trump's \"beck and call\" when the request arrives as \"You're useless, we're the strongest, we don't need you, but come.\"",
      "Layered atop all of it, a tidal wave of AI-generated content. According to Cyabra, seventy-two percent of Iran war deepfake engagement occurs on TikTok, out of more than a hundred and forty-five million total views across the network. More people have watched AI-fabricated war footage than watched the Super Bowl. The campaign is multilingual: Farsi, Arabic, Hebrew, English, and multiple East Asian languages. Synchronized posting windows. Fixed hashtag clusters. Fabricated footage showing massive explosions in Tel Aviv, missile strikes on American warships, schools hit moments before children were killed. Real footage and fake footage in the same feed. The algorithm makes no distinction between them.",
      "Cronkite could end a war with a single editorial because he was the only one talking. Now a thousand Cronkites speak at once, in every language, and some of them are not real, and the platform doesn't care."
    ]
  },
  {
    "act": "IV",
    "title": "THE BILLION-DOLLAR TARGET",
    "paras": [
      "On March 19, 2026, a United States Air Force F-35A Lightning II was flying a combat mission over central Iran when it was struck by ground fire and forced to make an emergency landing at a regional air base. The pilot survived. The IRGC published video within hours. One aircraft: a hundred million dollars. The program that built it: one point seven trillion. Thirty F-35s were amassed in the theater. The air base that scrambled to receive the damaged jet is part of a network that costs billions per year to maintain.",
      "The weapon that hit it used a passive infrared sensor. No radar emission. No signal for the aircraft's systems to detect. It looked for heat. The F-35's defining achievement, the stealth coating that makes it nearly invisible to radar, was irrelevant. The sensor was looking at a different part of the spectrum entirely.",
      "Defense analyst Sebastien Roblin noted that the most worrisome implication, if the IRGC footage is authentic, is that the F-35's Distributed Aperture System, six infrared cameras providing three-hundred-sixty-degree coverage designed specifically to detect incoming missiles, may have failed to register the threat. No evasive maneuvers visible. No flares deployed. The most expensive sensor suite ever mounted on a fighter jet, blind to the thing that found it.",
      "The losses compound. More than twenty MQ-9 Reapers destroyed, at thirty-two million dollars each: over six hundred and forty million in unmanned aircraft. Three F-15E Strike Eagles shot down by a Kuwaiti F/A-18 in a friendly fire incident over Kuwait. Six crew ejected safely. The jets, at ninety million each, did not survive. A KC-135 Stratotanker crashed in western Iraq, killing all six airmen aboard. Five more KC-135s were destroyed on the ground when an Iranian ballistic missile hit Prince Sultan Air Base in Saudi Arabia. The Pentagon is spending three point one billion dollars a day.",
      "The mathematics from here are obscene.",
      "In the first five days, the United States expended more than eight hundred Patriot interceptors. Three point nine million dollars each. Two point four billion dollars in defensive munitions consumed in less than a week, from an arsenal the Pentagon itself assessed at twenty-five percent of required levels before the war started. The shortfall was predictable: years of donations to Ukraine and sustained combat against Houthi missiles had drained the stockpile. The Army's response has been to quadruple procurement, from 3,376 missiles to 13,773, at an additional cost of forty billion dollars. The Missile Defense Agency simultaneously launched a competition for a new interceptor costing less than seven hundred fifty thousand dollars per shot. The existence of this program is the admission: the current model cannot survive contact with an adversary willing to launch cheap missiles in volume.",
      "But the single most devastating line item is interceptors that miss.",
      "On March 21, Iranian ballistic missiles struck the cities of Dimona and Arad in southern Israel. Dimona sits twenty kilometers from the Shimon Peres Negev Nuclear Research Center, Israel's primary nuclear facility. The Israeli military admitted it could not intercept them. Firefighters on the scene stated: \"interceptors were launched that failed to hit the threats, resulting in two direct hits by ballistic missiles with warheads weighing hundreds of kilograms.\" In Dimona, multiple residential buildings collapsed. Sixty-four wounded. In Arad, a hundred and sixteen wounded, seven seriously. The city center was extensively damaged. In Rishon Lezion, a kindergarten was hit by a cluster munition from an Iranian ballistic missile. Warhead debris struck the Old City of Jerusalem. Three private planes were destroyed on the tarmac at Ben Gurion Airport, which limited outbound flights to a hundred and thirty passengers. A hundred and fifty people were taken to Israeli hospitals in twenty-four hours. Netanyahu called it \"a very difficult evening.\" Iran's Parliament Speaker posted on X: entering a new phase of the battle.",
      "Iron Dome. Arrow-3. David's Sling. THAAD. The most advanced multi-layered missile defense architecture on earth, the system that was supposed to be the answer, and yesterday missiles landed on Dimona and the interceptors missed.",
      "In the Strait of Hormuz, Iran has deployed a different kind of weapon. Explosive drone boats disguised as fishing skiffs, using encryption and frequency-hopping, programmed with waypoints or controlled remotely. Iran's new Supreme Leader has pledged to keep targeting ships. The strait is twenty-one miles wide in places. Iran allows some countries' vessels to pass: China, Russia, Pakistan, India, Turkey. Others are blocked. This is selective economic warfare, calibrated to split the global response. Twenty-two countries, including the UK, Germany, France, and Japan, have expressed readiness to ensure safe passage. Twenty percent of the world's oil flows through these waters. The US Navy, the most powerful maritime force in human history, is being bled by speedboats, shallow-water submarines, and drone skiffs that collectively cost less than a single hour of the cargo they threaten."
    ]
  },
  {
    "act": "V",
    "title": "THE SHATTERED MYTHOS",
    "paras": [
      "For decades, America and Israel shared a story about military power. The spending was the deterrent. The technology was the guarantee. Iron Dome was impenetrable. The F-35 was invisible. The carrier group was untouchable. Mossad was omniscient. The IDF was the most effective fighting force in the region and possibly the world. These were not lies. They were built on real capability, real spending, real engineering. But they were stories, and stories depend on the audience believing them.",
      "The audience is watching the stories fall apart in real time, on their phones, in every language, all at once.",
      "An F-35 limping home from Iranian airspace, hit by a sensor that cost less than a used car. Three allied jets falling from the sky over Kuwait, shot down by a partner nation. Six airmen dead in Iraq. Twenty Reapers destroyed. Two point four billion in interceptors burned through in five days with the magazine already near empty. Missiles landing on Dimona, twenty kilometers from Israel's nuclear center, while the interceptors miss. A kindergarten in Rishon Lezion hit by a cluster munition. The Old City of Jerusalem struck by warhead debris. Ben Gurion Airport damaged. A hundred and eighty people wounded in a single evening in southern Israel. Each of these events, individually, is a setback. Stitched together on Telegram, clipped for TikTok, analyzed on podcasts and X, they compose something else: the visible, globally distributed, algorithmically amplified erosion of the perception that American and Israeli military technology cannot be beaten.",
      "No allied nation joined Operation Epic Fury. Germany refused publicly. NATO's language has moved past diplomacy. The President posted \"we don't need anybody\" into a void, because the nations that were supposed to follow chose not to.",
      "Israeli arms exports hit fourteen point eight billion dollars in 2024, with Europe purchasing fifty-four percent. The marketing pitch for every system was the same: battle-tested, field-proven. The AI targeting systems Lavender and Gospel were used to generate bombing targets in Gaza at industrial scale. Intelligence officers described Lavender as having roughly a ten percent error rate, flagging police, civil defense workers, people who shared a name with a militant. The war minister explicitly stated that the export boom was a \"direct result\" of operational successes. But the pitch cuts both ways now. If Iron Dome fails over Dimona, on camera, with the whole world watching, what exactly is the export customer buying? The laboratory is open. The product is proven. The proof is failing on home soil.",
      "As of March 17, thirteen American service members have been killed. Approximately two hundred have been wounded. In Iran, at least 1,444 civilians are dead and over eighteen thousand injured. The IDF chief of staff described the campaign as being at the \"halfway\" stage. The war is entering its fourth week. The numbers will grow. They will be reported and absorbed into the stream and replaced by the next clip, the next meme, the next barrage. The strategic abstractions, the cost ratios, the interceptor tallies, rest on a foundation of human destruction that is easy to forget when you are staring at a screen. But the screen is where the myth dies. Frame by frame. On Al Jazeera. On Telegram. On X. In every feed, in every country, watched by people who are quietly recalculating what American and Israeli power actually means."
    ]
  },
  {
    "act": "VI",
    "title": "THE FLOOD",
    "paras": [
      "Here is what has already happened, while most people were looking at something else.",
      "In a warehouse near Pokrovsk, a twenty-two-year-old Ukrainian artilleryman straps on a powered exoskeleton and loads howitzer shells at twice the speed his body could manage unassisted. In San Francisco, a humanoid robot named Phantom learns to carry a rifle across uneven terrain. In a basement in Dnipro, a teenager flies a four-hundred-dollar drone into the side of a tank built the year Stalin died. In Tehran, a server farm renders video of an explosion in Tel Aviv that never happened, and three million people watch it before lunch. In the Strait of Hormuz, a fishing skiff packed with explosives and guided by encrypted satellite link drifts toward a tanker carrying two million barrels of crude. On Truth Social, the President of the United States types in all caps. On X, Iran's parliament speaker posts a tactical assessment of Israeli missile defense failures. In Rishon Lezion, first responders pick through the wreckage of a kindergarten hit by a cluster munition.",
      "All of this is happening simultaneously. All of it is visible. All of it is in your feed.",
      "The paradigm did not shift gradually. It broke. Somewhere between the first FPV drone kill in Ukraine and the BadeSaba push notification that arrived on five million phones while cruise missiles were still in the air, the old model of warfare, humans fight, governments narrate, the public decides whether to support it, stopped functioning. What replaced it has no name yet. Machines hold front lines. Algorithms generate the footage. Governments post SpongeBob memes about active combat operations. Adversaries communicate directly with each other's populations on the same commercial platforms. Retired generals provide real-time tactical analysis that anyone on earth can read, including the enemy. AI fabricates events that never happened and the fabrications get more engagement than the real ones. The hierarchy of information that democracies relied on to sustain public support for war, the idea that there is an authoritative account, a shared set of facts, a narrative that the public can evaluate and either accept or reject, that hierarchy is gone.",
      "Technology used to be the tool. The soldier was the actor. The general decided. The president spoke. The journalist reported. The citizen watched. Each role was distinct. Each bottleneck, the limited broadcast channels, the editorial gatekeepers, the physical time delays, the classification systems, kept the structure intact. Every single one of those bottlenecks has been destroyed. The roles have blurred past recognition. The soldier is a drone operator who posts his kills. The general is a retired commentator on X. The president communicates through meme edits. The journalist is an OSINT account with a satellite subscription. The citizen watches a kindergarten strike and a SpongeBob video in the same scroll and cannot tell which one the government thinks is more important.",
      "And the machines are taking over the fighting. Fifteen thousand ground robots in Ukraine. Humanoids with rifles. Drone swarms that outnumber soldiers. Armed UGVs that hold positions for weeks. The human, increasingly, is the vulnerability. The part that bleeds. The part that surrenders. The part that can be psychologically broken by a push notification on a prayer app. The machines do not panic. The algorithms do not grieve. The drones do not need to believe in the cause.",
      "The question is not whether this is good or bad. The question is whether anyone is in control of it. Whether the democratic structures that were built to govern war, congressional authorization, public deliberation, alliance formation, international law, can function when the war moves faster than the deliberation, when the information environment is ungovernable, when the weapons are autonomous, when the adversary is on your platform and in your feed and speaking your language.",
      "Somewhere right now, someone is soldering a circuit board, training a model, writing a line of code. The next weapon will cost less than the last one. It will be more effective. It will be filmed. The footage will reach a billion people before sunset. A kindergarten in Rishon Lezion and a SpongeBob meme, side by side, in the same scroll, right now, on the device in your hand."
    ]
  }
];

const CLIPS = [
  { type:"WHITE HOUSE",title:"Call of Duty kill scores over real strikes",detail:"Set to Childish Gambino's 'Bonfire.' Kill score overlays after each real explosion. 'We're winning this fight.' No indication which footage is real.",views:"58M",date:"Mar 5",c:"#FF3B30",src:"White House / X",url:"https://x.com/WhiteHouse/status/2029307088808055083" },
  { type:"WHITE HOUSE",title:"SpongeBob: 'Want to see me do it again?'",detail:"14 seconds. SpongeBob as superhero, then real missile strike. Caption: 'Will not stop. Unrelenting. Unapologetic.'",views:"18M",date:"Mar 6",c:"#FF3B30",src:"White House / X",url:"https://x.com/WhiteHouse/status/2029657893155311927" },
  { type:"WHITE HOUSE",title:"Mortal Kombat 'FLAWLESS VICTORY'",detail:"Top Gun, Iron Man, Braveheart, Gladiator spliced with real strikes. Caption: 'JUSTICE THE AMERICAN WAY.'",views:"12M",date:"Mar 6",c:"#FF3B30",src:"White House / X",url:"https://x.com/WhiteHouse/status/2029741548791853331" },
  { type:"WHITE HOUSE",title:"GTA: 'Ah sh*t, here we go again'",detail:"Grand Theft Auto: San Andreas opening, then real footage of US strike on a box truck.",views:"8M",date:"Mar 7",c:"#FF3B30",src:"White House / X",url:"https://x.com/WhiteHouse/status/2029953667600646655" },
  { type:"TUCKER CARLSON",title:"'I can't believe he did this to us'",detail:"Piers Morgan: 'The only people who support this war are those born 1946-1964 who watch Fox News. That's it.'",views:"Viral",date:"Mar 13",c:"#F5A623",src:"Tucker Carlson Network" },
  { type:"TUCKER CARLSON",title:"Joe Kent: 'No intelligence showed imminent threat'",detail:"Former NCTC director, 20-yr Army, 11 combat deployments, Gold Star husband: 'No intelligence showed an imminent threat from Iran.'",views:"121 min",date:"Mar 18",c:"#F5A623",src:"CNN / Tucker Carlson",url:"https://www.cnn.com/2026/03/18/politics/joe-kent-iran-tucker-carlson" },
  { type:"TRUMP",title:"'We don't need anybody'",detail:"Truth Social, while zero allied nations had joined. Germany: 'Not our war.' France: allies won't be at Trump's 'beck and call.'",views:"",date:"Mar '26",c:"#FF6B35",src:"Truth Social",url:"https://truthsocial.com/@realDonaldTrump/posts/116245182325726375" },
  { type:"CNN INTERVIEW",title:"Iran's Kharazi: 'False narrative'",detail:"Filmed inside Iran. Calm, measured. 'No room for diplomacy.' Direct contrast to White House meme videos airing the same day.",views:"Live",date:"Mar '26",c:"#3478F6",src:"CNN / Pleitgen",url:"https://www.cnn.com/2026/03/09/world/video/iran-kamal-kharazi-no-diplomacy-vrtc" },
  { type:"CYABRA",title:"72% of deepfake engagement on TikTok",detail:"Multilingual AI campaign: Farsi, Arabic, Hebrew, English. Synchronized posting, fixed hashtag clusters, Hollywood production values. 145M+ views.",views:"145M+",date:"Mar '26",c:"#8B6FD4",src:"Cyabra" },
];

const MS = [
  { id:"shahed",name:"Shahed-136",co:"IRAN",cost:"$20-50K",cn:35e3,c:"#2A9D3A",len:3.5,wt:"200 kg",wh:"30-50 kg HE",rng:"1,800 km",spd:"185 km/h",type:"Loitering munition",guid:"GPS+INS+4G",note:"Swarms of 5 from truck beds. Warhead = 5x 155mm shells.",src:"HESA / Iran Watch" },
  { id:"tamir",name:"Tamir",co:"ISRAEL",cost:"$50K",cn:50e3,c:"#8B6FD4",len:3,wt:"90 kg",wh:"11 kg blast-frag",rng:"4-70 km",spd:"Mach 2.2",type:"Interceptor",guid:"Active radar",note:"~90% claimed success. 20 per launcher.",src:"Rafael" },
  { id:"pac3",name:"PAC-3 MSE",co:"USA",cost:"$3.9M",cn:39e5,c:"#3478F6",len:5.2,wt:"312 kg",wh:"Hit-to-kill",rng:"120 km",spd:"Mach 5+",type:"Interceptor",guid:"Ka-band active radar",note:"$2.4B in 5 days. Stockpile at 25%.",src:"Lockheed Martin" },
  { id:"tomahawk",name:"Tomahawk V",co:"USA",cost:"$2-4M",cn:3e6,c:"#3478F6",len:5.56,wt:"1,300 kg",wh:"454 kg HE",rng:"1,600 km",spd:"880 km/h",type:"Cruise missile",guid:"GPS/INS/TERCOM",note:"~400 in first 72 hrs. 24 months each to build.",src:"Raytheon / NAVAIR" },
  { id:"fattah",name:"Fattah-1",co:"IRAN",cost:"~$500K",cn:5e5,c:"#2A9D3A",len:11.5,wt:"4,600 kg",wh:"350-450 kg HE",rng:"1,400 km",spd:"Mach 13-15",type:"MRBM",guid:"MaRV+TVC",note:"Terminal maneuvering reentry vehicle.",src:"IRGC / IISS" },
  { id:"arrow3",name:"Arrow 3",co:"ISRAEL",cost:"~$3M",cn:3e6,c:"#8B6FD4",len:7,wt:"2,300 kg",wh:"Hit-to-kill exo",rng:"2,400 km",spd:"Mach 9",type:"ABM interceptor",guid:"IR seeker",note:"Exoatmospheric. Destroys missiles in space.",src:"IAI / Boeing" },
  { id:"sejjil",name:"Sejjil-2",co:"IRAN",cost:"~$5M",cn:5e6,c:"#2A9D3A",len:18,wt:"23,600 kg",wh:"700-1,500 kg",rng:"2,000 km",spd:"Mach 14+",type:"MRBM (solid)",guid:"INS+MaRV",note:"Iran's heaviest. MIRV-capable. <7 min to Tel Aviv.",src:"CSIS Missile Threat" },
  { id:"sm2",name:"SM-2 IIIA",co:"USA",cost:"~$2.1M",cn:21e5,c:"#3478F6",len:4.72,wt:"708 kg",wh:"Blast-fragment",rng:"167 km",spd:"Mach 3+",type:"Ship SAM",guid:"Semi-active radar",note:"96 VLS cells per Burke. Each = finite defense.",src:"Raytheon / US Navy" },
];

const DUR = [
  { l:"1 week",brent:94,physD:126,gas:3.45,gasCa:5.20,pat:1.2,kia:6,wound:140,civD:500,civW:6e3,gdp:-0.3,rec:5,infl:0.2,fert:550,spr:405,reaper:8,ship:8,daily:3.1 },
  { l:"3 weeks",brent:112,physD:138,gas:3.93,gasCa:5.62,pat:2.4,kia:13,wound:200,civD:1444,civW:18551,gdp:-0.8,rec:15,infl:0.5,fert:680,spr:385,reaper:20,ship:21,daily:3.1 },
  { l:"2 months",brent:128,physD:152,gas:4.50,gasCa:6.40,pat:5.5,kia:35,wound:550,civD:4200,civW:45e3,gdp:-1.5,rec:25,infl:0.8,fert:820,spr:335,reaper:35,ship:60,daily:2.8 },
  { l:"6 months",brent:145,physD:170,gas:5.80,gasCa:8.20,pat:12,kia:120,wound:2e3,civD:15e3,civW:12e4,gdp:-2.9,rec:55,infl:1.5,fert:1100,spr:215,reaper:50,ship:180,daily:2.5 },
  { l:"1 year",brent:160,physD:185,gas:7.20,gasCa:10.50,pat:22,kia:350,wound:5500,civD:45e3,civW:3e5,gdp:-4.5,rec:75,infl:2.5,fert:1400,spr:65,reaper:65,ship:400,daily:2.2 },
];

function Model3D({ build, h = 240, cap, camZ = 6 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const w = el.clientWidth;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    cam.position.set(0, 2, camZ);
    cam.lookAt(0, 0, 0);
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    r.setSize(w, h);
    r.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(r.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(3, 5, 4);
    scene.add(dl);
    const g = new THREE.Group();
    build(g);
    scene.add(g);
    let md = false, mx = 0;
    const dn = e => { md = true; mx = (e.touches ? e.touches[0] : e).clientX; };
    const up = () => { md = false; };
    const mv = e => { if (!md) return; const x = (e.touches ? e.touches[0] : e).clientX; g.rotation.y += (x - mx) * 0.01; mx = x; };
    el.addEventListener("mousedown", dn);
    el.addEventListener("touchstart", dn);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    el.addEventListener("mousemove", mv);
    el.addEventListener("touchmove", mv);
    let af;
    const anim = () => { af = requestAnimationFrame(anim); if (!md) g.rotation.y += 0.005; r.render(scene, cam); };
    anim();
    return () => {
      cancelAnimationFrame(af);
      r.dispose();
      if (el.contains(r.domElement)) el.removeChild(r.domElement);
      el.removeEventListener("mousedown", dn);
      el.removeEventListener("touchstart", dn);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      el.removeEventListener("mousemove", mv);
      el.removeEventListener("touchmove", mv);
    };
  }, []);
  return (
    <div style={{ margin: "28px auto", textAlign: "center", maxWidth: 520 }}>
      <div ref={ref} style={{ width: "100%", height: h, cursor: "grab", borderRadius: 4, overflow: "hidden", background: "radial-gradient(ellipse at 50% 40%,#111,#0a0a0a)" }} />
      {cap && <div style={{ fontSize: 9, letterSpacing: 3, color: "#fff", marginTop: 6, fontFamily: "monospace" }}>{cap}</div>}
    </div>
  );
}

function buildDrone(g) {
  const m = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const b = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.3), m);
  g.add(b);
  for (let i = 0; i < 4; i++) {
    const a = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5), new THREE.MeshStandardMaterial({ color: 0x555555 }));
    a.rotation.z = Math.PI / 2;
    a.rotation.y = (Math.PI / 2) * i;
    a.position.set(Math.cos((Math.PI / 2) * i) * 0.3, 0, Math.sin((Math.PI / 2) * i) * 0.3);
    g.add(a);
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.01, 16), new THREE.MeshStandardMaterial({ color: 0x666666, transparent: true, opacity: 0.5 }));
    p.position.set(Math.cos((Math.PI / 2) * i) * 0.5, 0.05, Math.sin((Math.PI / 2) * i) * 0.5);
    g.add(p);
  }
  const pl = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.25), new THREE.MeshStandardMaterial({ color: 0x884422 }));
  pl.position.set(0, -0.2, 0);
  g.add(pl);
  g.scale.set(2, 2, 2);
}

function buildShahed(g) {
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.12, 2.5, 8), new THREE.MeshStandardMaterial({ color: 0x556644 }));
  b.rotation.x = Math.PI / 2;
  g.add(b);
  const n = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.4, 8), new THREE.MeshStandardMaterial({ color: 0x445533 }));
  n.rotation.x = -Math.PI / 2;
  n.position.z = -1.45;
  g.add(n);
  const wg = new THREE.BufferGeometry();
  wg.setAttribute("position", new THREE.BufferAttribute(new Float32Array([-0.8, 0, 0.3, 0, 0, -0.2, 0, 0, 0.8, 0.8, 0, 0.3, 0, 0, -0.2, 0, 0, 0.8]), 3));
  wg.computeVertexNormals();
  const wm = new THREE.MeshStandardMaterial({ color: 0x556644, side: THREE.DoubleSide });
  g.add(new THREE.Mesh(wg, wm));
  const wr = new THREE.Mesh(wg, wm);
  wr.scale.x = -1;
  g.add(wr);
  g.scale.set(1.2, 1.2, 1.2);
}

function buildF35(g) {
  const bm = new THREE.MeshStandardMaterial({ color: 0x778899, metalness: 0.6, roughness: 0.3 });
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 3, 8), bm);
  b.rotation.x = Math.PI / 2;
  g.add(b);
  const n = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.8, 8), new THREE.MeshStandardMaterial({ color: 0x889aaa, metalness: 0.6, roughness: 0.3 }));
  n.rotation.x = -Math.PI / 2;
  n.position.z = -1.9;
  g.add(n);
  const cp = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xccaa33, metalness: 0.8, roughness: 0.1 }));
  cp.position.set(0, 0.2, -0.8);
  g.add(cp);
  const wm = new THREE.MeshStandardMaterial({ color: 0x778899, metalness: 0.5, roughness: 0.3, side: THREE.DoubleSide });
  for (const s of [-1, 1]) {
    const wg = new THREE.BufferGeometry();
    wg.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, -0.5, s * 1.8, 0, 0.2, 0, 0, 0.8]), 3));
    wg.computeVertexNormals();
    g.add(new THREE.Mesh(wg, wm));
  }
  const t = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.6, 0.4), new THREE.MeshStandardMaterial({ color: 0x778899, metalness: 0.5 }));
  t.position.set(-0.2, 0.3, 1.2);
  t.rotation.z = 0.3;
  g.add(t);
  const t2 = t.clone();
  t2.position.x = 0.2;
  t2.rotation.z = -0.3;
  g.add(t2);
  g.position.y = -0.3;
}

function buildHumanoid(g) {
  const skin = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.7, roughness: 0.3 });
  const accent = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.5, roughness: 0.4 });
  const glow = new THREE.MeshStandardMaterial({ color: 0xFF3B30, emissive: 0xFF3B30, emissiveIntensity: 0.5 });
  // Torso
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.3), skin);
  torso.position.y = 0.4;
  g.add(torso);
  // Chest plate
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.05), accent);
  plate.position.set(0, 0.5, 0.18);
  g.add(plate);
  // Head
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.3, 0.25), skin);
  head.position.y = 1.05;
  g.add(head);
  // Visor
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.05), glow);
  visor.position.set(0, 1.08, 0.15);
  g.add(visor);
  // Arms
  for (const s of [-1, 1]) {
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 0.12), skin);
    upper.position.set(s * 0.42, 0.5, 0);
    g.add(upper);
    const lower = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.1), accent);
    lower.position.set(s * 0.42, 0.1, 0);
    g.add(lower);
  }
  // Legs
  for (const s of [-1, 1]) {
    const thigh = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.16), skin);
    thigh.position.set(s * 0.18, -0.2, 0);
    g.add(thigh);
    const shin = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.4, 0.14), accent);
    shin.position.set(s * 0.18, -0.6, 0);
    g.add(shin);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.25), skin);
    foot.position.set(s * 0.18, -0.83, 0.04);
    g.add(foot);
  }
  // Rifle (right hand)
  const rifle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.7), new THREE.MeshStandardMaterial({ color: 0x111111 }));
  rifle.position.set(0.42, 0.0, 0.3);
  rifle.rotation.x = 0.3;
  g.add(rifle);
  g.position.y = -0.2;
  g.scale.set(1.5, 1.5, 1.5);
}

function EvolutionStepper() {
  const [era, setEra] = useState(0);
  const eras = [
    { y:"1916", n:"THE TRENCH", h:100, m:0,
      img:"https://upload.wikimedia.org/wikipedia/commons/f/fc/Cheshire_Regiment_trench_Somme_1916.jpg",
      desc:"Infantry charging into machine guns across no man's land. Cavalry, dominant for 3,000 years, meets barbed wire and the Maxim gun. The Somme: 57,000 British casualties on day one.",
      weapon:"Bolt-action rifle + machine gun", cost:"~$30 per Lee-Enfield (1916 USD)",
      kill:"Human aims, human fires, human decides every action", split:"Human 100% / Machine 0%" },
    { y:"1944", n:"THE MACHINE AGE", h:90, m:10,
      img:"https://upload.wikimedia.org/wikipedia/commons/0/07/M4_Sherman_tank_-_Flickr_-_Joost_J._Bakker_IJmuiden.jpg",
      desc:"Mechanized combined-arms warfare. Tanks punch through static defenses. B-17s flatten cities from 30,000 feet. The human is now inside the machine: driving, aiming, deciding, but encased in steel.",
      weapon:"M4 Sherman + B-17 Flying Fortress", cost:"$64K per Sherman / $238K per B-17 (1944 USD)",
      kill:"Human crews drive, aim, drop ordnance. Humans inside machines.", split:"Human 90% / Machine 10%" },
    { y:"1991", n:"THE SCREEN", h:60, m:40,
      img:"https://upload.wikimedia.org/wikipedia/commons/a/a1/F-117_Nighthawk_Front.jpg",
      desc:"Stealth and precision-guided munitions. The F-117, invisible to radar, drops laser-guided bombs with surgical accuracy. CNN broadcasts from Baghdad live. The pilot never sees the target with bare eyes.",
      weapon:"F-117 Nighthawk + Paveway LGB + Tomahawk", cost:"$111M per F-117 / $1.1M per Tomahawk",
      kill:"Human selects target. Laser designates. Guidance steers the bomb. Human watches on screen.", split:"Human 60% / Machine 40%" },
    { y:"2024", n:"THE SWARM", h:30, m:70,
      img:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Ukrainian_FPV-drone.jpg",
      desc:"FPV drones ($400) destroy tanks ($4M). Ukraine produces 9,000 per day. 15,000 ground robots deployed. A UGV holds a position for 45 days with no humans. The operator sits in a basement 3km away wearing goggles.",
      weapon:"FPV drone + armed UGV + Shahed-136", cost:"$300-500 per FPV / $4M+ per tank killed",
      kill:"Human pilots via goggles. Ground robot holds position semi-autonomously. Human removed from front line.", split:"Human 30% / Machine 70%" },
    { y:"2026", n:"THE THRESHOLD", h:25, m:75,
      img:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Phantom_MK-1.jpg/640px-Phantom_MK-1.jpg",
      desc:"AI targeting systems (Lavender/Gospel) generate kill lists. Humans approve, for now. Phantom MK-1 humanoid robots arrive for battlefield evaluation. Exoskeletons in field trials. The loop is tightening.",
      weapon:"FPV swarm + AI targeting (Lavender/Gospel) + Shahed-136", cost:"$400/FPV · ~$0.02/AI targeting decision · Phantom MK-1 (eval only)",
      kill:"AI generates target list. Human approves (for now). Drones execute. Humanoids in evaluation.", split:"Human 25% / Machine 75%" },
  ];
  const e = eras[era];
  const [imgErr, setImgErr] = useState({});
  return (
    <div style={{ margin:"40px 0", border:"1px solid #1a1a1a", borderRadius:4, overflow:"hidden", background:"#060608" }}>
      <div style={{ display:"flex", gap:0, borderBottom:"1px solid #1a1a1a", overflowX:"auto" }}>
        {eras.map((er,i) => (
          <button key={i} onClick={() => setEra(i)} style={{ flex:1, minWidth:0, padding:"10px 6px", fontSize:9, letterSpacing:1, fontFamily:"monospace", cursor:"pointer", border:"none", borderBottom:era===i?"2px solid #FF3B30":"2px solid transparent", background:era===i?"rgba(255,59,48,0.08)":"transparent", color:era===i?"#FF3B30":"#888", whiteSpace:"nowrap" }}>
            <div style={{ fontWeight:700, fontSize:11 }}>{er.y}</div>
            <div style={{ fontSize:7, letterSpacing:1.5, marginTop:2 }}>{er.n}</div>
          </button>
        ))}
      </div>
      <div style={{ position:"relative", minHeight:220, background:"#080808" }}>
        {!imgErr[era] ? (
          <img src={e.img} alt={`${e.y} warfare`} onError={() => setImgErr(prev => ({...prev, [era]: true}))}
            style={{ width:"100%", height:280, objectFit:"cover", display:"block", opacity:0.7, filter:"grayscale(30%)" }} />
        ) : (
          <div style={{ height:220, display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(180deg,#0a0c10,#060608)" }}>
            <div style={{ textAlign:"center", padding:30 }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:48, color:era===4?"#FF3B30":"#333", letterSpacing:4 }}>{e.y}</div>
              <div style={{ fontSize:9, color:"#555", fontFamily:"monospace", letterSpacing:2, marginTop:4 }}>{e.n}</div>
            </div>
          </div>
        )}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(6,6,8,0.95))", padding:"40px 16px 12px" }}>
          <div style={{ fontSize:12, color:"#ccc", lineHeight:1.6, maxWidth:600 }}>{e.desc}</div>
        </div>
      </div>
      <div style={{ padding:"12px 14px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:8, color:"#888", fontFamily:"monospace", marginBottom:4 }}>
          <span>HUMAN: {e.h}%</span>
          <span style={{ color:era>=3?"#FF3B30":"#888" }}>MACHINE: {e.m}%</span>
        </div>
        <div style={{ display:"flex", height:6, borderRadius:3, overflow:"hidden", marginBottom:12 }}>
          <div style={{ width:`${e.h}%`, background:"#3478F6", transition:"width 0.5s" }} />
          <div style={{ width:`${e.m}%`, background:"#FF3B30", transition:"width 0.5s" }} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
          {[{l:"DOMINANT WEAPON",v:e.weapon},{l:"UNIT COST",v:e.cost},{l:"KILL MECHANISM",v:e.kill},{l:"ROLE SPLIT",v:e.split}].map((s,i) => (
            <div key={i} style={{ padding:"8px 10px", background:"rgba(255,255,255,0.02)", border:"1px solid #1a1a1a", borderRadius:2 }}>
              <div style={{ fontSize:6, color:"#888", letterSpacing:2, fontFamily:"monospace", marginBottom:2 }}>{s.l}</div>
              <div style={{ fontSize:10, color:"#ccc", fontFamily:"monospace", lineHeight:1.4 }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BadeSabaNotification() {
  return (
    <div style={{ maxWidth: 340, margin: "32px auto", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ fontSize: 9, letterSpacing: 3, color: "#FF3B30", fontFamily: "monospace", marginBottom: 10, textAlign: "center" }}>RECONSTRUCTED FROM REPORTS · WSJ / HACKREAD / WIRED</div>
      <div style={{ background: "#1a1a1a", borderRadius: 16, padding: 16, border: "1px solid #333" }}>
        <div style={{ fontSize: 10, color: "#888", marginBottom: 12, textAlign: "center" }}>9:52 AM Tehran Time · February 28, 2026</div>
        {[
          { time: "9:52 AM", msg: "Help has arrived.", icon: "🕌" },
          { time: "10:02 AM", msg: "The era of the dictators is over. Do not sacrifice your lives for a regime that has already fallen. Lay down your arms and join your people.", icon: "⚠️" },
          { time: "10:12 AM", msg: "Join the forces of liberation. Amnesty for all who surrender.", icon: "🕊️" },
        ].map((n, i) => (
          <div key={i} style={{ background: "#222", borderRadius: 12, padding: "10px 14px", marginBottom: 8, border: "1px solid #333" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>BadeSaba Calendar</span>
              <span style={{ fontSize: 9, color: "#666" }}>{n.time}</span>
            </div>
            <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.5 }}>{n.msg}</div>
          </div>
        ))}
        <div style={{ fontSize: 9, color: "#666", textAlign: "center", marginTop: 8 }}>
          5M+ downloads · Internet dropped to 4% (NetBlocks)
        </div>
      </div>
    </div>
  );
}

function CompressionTimeline() {
  const eras = [
    { year: "1965", era: "VIETNAM", lag: "3 DAYS", desc: "Film reels shipped across the Pacific by cargo plane. Developed in labs. Edited in studios. Broadcast on the evening news. Cronkite's Tet editorial aired a month after the offensive.", c: "#4A4A4A" },
    { year: "1991", era: "GULF WAR", lag: "~LIVE", desc: "CNN broadcast from Baghdad. Green-tint night vision. Wolf Blitzer in a flak jacket. Live but curated. You saw what the Pentagon wanted you to see.", c: "#5A5A5A" },
    { year: "2003", era: "IRAQ", lag: "HOURS", desc: "Embedded journalists. Al Jazeera as counternarrative. Two versions of the same war watched by two audiences. The crack in monopoly appeared.", c: "#7A7A7A" },
    { year: "2022", era: "UKRAINE", lag: "MINUTES", desc: "Soldiers posted kills to Telegram. Drone operators streamed. Zelensky addressed the world from his iPhone. No intermediaries. No editors.", c: "#AA4444" },
    { year: "2026", era: "IRAN", lag: "ZERO", desc: "Perception arrives before the event is understood. BadeSaba push notifications during the first explosions. TikTok deepfakes reach millions. The algorithm makes no distinction.", c: "#FF3B30" },
  ];
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ margin: "48px 0" }}>
      <div style={{ fontSize: 9, letterSpacing: 4, color: "#FF3B30", fontFamily: "monospace", marginBottom: 20 }}>EVENT TO SCREEN: THE COMPRESSION</div>
      {eras.map((e, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "80px 70px 1fr", gap: 16, padding: "20px 0",
          borderBottom: "1px solid #1a1a1a", alignItems: "start",
          opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-30px)",
          transition: `all .8s cubic-bezier(.22,1,.36,1) ${i * 200}ms`
        }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: e.c }}>{e.year}</span>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: "#FF3B30", paddingTop: 8, fontWeight: 700 }}>{e.lag}</span>
          <div>
            <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 2, color: "#888", display: "block", marginBottom: 4 }}>{e.era}</span>
            <span style={{ fontSize: 14, lineHeight: 1.6, color: "#fff" }}>{e.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function VideoEmbed({ title, source, description, url, timestamp }) {
  const getYouTubeId = (u) => {
    if (!u) return null;
    const m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return m ? m[1] : null;
  };
  const ytId = getYouTubeId(url);
  const isTwitter = url && (url.includes('x.com') || url.includes('twitter.com'));
  const isCNN = url && url.includes('cnn.com') && url.includes('video');

  return (
    <div style={{
      background: "#000", border: "2px solid #222", borderRadius: 4, margin: "20px 0",
      overflow: "hidden", position: "relative"
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #FF3B30, transparent 30%, transparent 70%, #FF3B30)" }} />
      {ytId ? (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?rel=0`}
            title={title}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : isTwitter ? (
        <div style={{ background: "#000", padding: 16, minHeight: 120, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 10, color: "#1DA1F2", fontFamily: "monospace", letterSpacing: 2, marginBottom: 8 }}>X / TWITTER \u00b7 LIVE POST</div>
          <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.5 }}>{title}</div>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: "#1DA1F2", marginTop: 8, textDecoration: "none" }}>View on X \u2197</a>
        </div>
      ) : isCNN ? (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", background: "#111" }}>
          <iframe
            src={url}
            title={title}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            allowFullScreen
          />
        </div>
      ) : null}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF3B30", boxShadow: "0 0 6px #FF3B30" }} />
          <span style={{ fontSize: 8, letterSpacing: 2, color: "#FF3B30", fontFamily: "monospace", fontWeight: 700 }}>LIVE BROADCAST</span>
          <div style={{ flex: 1 }} />
          {timestamp && <span style={{ fontSize: 8, color: "#888", fontFamily: "monospace" }}>{timestamp}</span>}
        </div>
        <div style={{ fontSize: 14, color: "#fff", fontWeight: 600, marginBottom: 6, fontFamily: "monospace", lineHeight: 1.4 }}>{title}</div>
        <div style={{ fontSize: 11, color: "#ccc", lineHeight: 1.5, marginBottom: 8 }}>{description}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 8, color: "#888", fontFamily: "monospace" }}>{source}</span>
          {url && <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 8, color: "#FF3B30", fontFamily: "monospace", fontWeight: 700, textDecoration: "none" }}>WATCH LIVE \u25b6</a>}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "#333" }} />
    </div>
  );
}


// Pre-computed SVG paths from Natural Earth 50m data via d3-geo
// Projection: d3.geoEquirectangular().center([46,29.5]).scale(1200).translate([500,270])
const MAP_PATHS = {
  IRAN:"M665.457,106.637L692.684,91.976L717.817,91.976L736.667,91.976L759.705,100.354L780.649,106.637L814.159,121.298L814.159,140.148L814.159,150.619L812.065,163.186L803.687,173.658L807.876,190.413L809.97,223.923L814.159,251.15L814.159,286.755L814.159,301.416L814.159,318.171L814.159,330.737L814.159,337.021L814.159,357.965L801.593,357.965L755.516,351.681L730.383,326.549L698.968,326.549L661.268,328.643L621.475,305.605L600.531,282.566L587.965,261.622L567.021,251.15L558.643,259.528L548.171,253.245L535.605,236.49L523.038,207.168L502.094,192.507L489.528,177.847L491.622,163.186L502.094,148.525L495.811,138.053L481.15,125.487L474.867,110.826L470.678,100.354L464.395,91.976L468.584,91.976L483.245,91.976L512.566,91.976L541.888,91.976L548.171,91.976L546.077,91.976L560.737,91.976L587.965,106.637L661.268,115.015Z",
  IRAQ:"M424.602,110.826L432.979,104.543L441.357,106.637L449.735,108.732L458.112,106.637L462.301,106.637L462.301,112.92L468.584,110.826L472.773,108.732L476.962,117.109L479.056,119.204L481.15,125.487L483.245,125.487L489.528,133.864L495.811,138.053L506.283,140.148L500,144.336L502.094,148.525L500,152.714L493.717,163.186L489.528,165.28L489.528,171.563L487.434,175.752L495.811,184.13L497.906,186.224L502.094,192.507L502.094,196.696L512.566,200.885L527.227,207.168L531.416,213.451L537.699,226.018L537.699,238.584L541.888,249.056L546.077,253.245L550.265,255.339L552.36,259.528L543.982,259.528L537.699,257.434L527.227,257.434L523.038,261.622L516.755,274.189L497.906,278.378L472.773,276.283L445.546,257.434L422.507,240.678L401.563,228.112L382.714,219.735L355.487,215.546L353.392,211.357L351.298,198.791L359.676,184.13L382.714,171.563L397.375,163.186L399.469,148.525L403.658,140.148L401.563,129.676L403.658,123.392L418.319,117.109Z",
  SAUDI:"M625.664,448.024L583.776,448.024L548.171,448.024L531.416,448.024L516.755,448.024L489.528,448.024L468.584,448.024L456.018,448.024L445.546,448.024L441.357,448.024L430.885,448.024L424.602,448.024L403.658,448.024L391.091,448.024L372.242,448.024L355.487,437.552L355.487,418.702L349.204,406.136L334.543,383.097L319.882,374.72L315.693,357.965L296.844,330.737L273.805,301.416L265.428,290.944L290.56,276.283L309.41,261.622L326.165,253.245L313.599,230.206L349.204,219.735L382.714,219.735L418.319,236.49L460.206,267.906L508.378,278.378L533.51,286.755L552.36,293.038L558.643,307.699L571.209,318.171L583.776,328.643L587.965,341.209L587.965,347.493L598.437,366.342L608.909,372.625L613.097,378.909L617.286,385.192L625.664,393.569L634.041,404.041L644.513,408.23L673.835,412.419L690.59,414.513L701.062,424.985L696.873,441.74L692.684,448.024L682.212,448.024L657.08,448.024L631.947,448.024Z",
  UAE:"M715.723,349.587L713.628,347.493L711.534,349.587L713.628,351.681L715.723,349.587L717.817,364.248L715.723,366.342L713.628,368.437L711.534,370.531L709.44,366.342L709.44,364.248L705.251,366.342L705.251,368.437L705.251,372.625L705.251,376.814L705.251,381.003L707.345,381.003L709.44,383.097L707.345,385.192L703.156,385.192L698.968,387.286L698.968,391.475L696.873,395.664L694.779,401.947L692.684,408.23L692.684,412.419L690.59,414.513L688.496,414.513L684.307,412.419L678.024,412.419L669.646,412.419L659.174,410.324L650.796,408.23L644.513,408.23L638.23,408.23L636.136,404.041L631.947,401.947L629.852,399.852L627.758,397.758L625.664,393.569L623.569,391.475L621.475,389.381L619.381,385.192L617.286,383.097L617.286,378.909L619.381,378.909L621.475,378.909L621.475,385.192L627.758,385.192L636.136,383.097L646.608,383.097L663.363,383.097L669.646,381.003L675.929,378.909L678.024,374.72L680.118,372.625L682.212,370.531L690.59,364.248L694.779,357.965L698.968,353.776L709.44,345.398L711.534,341.209L713.628,343.304Z",
  OMAN:"M648.702,448.024L642.419,448.024L638.23,448.024L636.136,448.024L631.947,448.024L627.758,448.024L642.419,448.024L657.08,448.024L671.74,448.024L686.401,448.024L690.59,448.024L692.684,448.024L696.873,443.835L698.968,433.363L701.062,424.985L694.779,414.513L692.684,406.136L698.968,393.569L698.968,387.286L705.251,385.192L709.44,383.097L705.251,378.909L705.251,372.625L705.251,366.342L709.44,364.248L709.44,366.342L711.534,370.531L715.723,366.342L722.006,374.72L734.572,387.286L757.611,393.569L768.083,395.664L772.271,404.041L782.743,414.513L789.027,420.796L782.743,431.268L770.177,445.929L757.611,448.024L749.233,448.024L738.761,448.024L724.1,448.024L709.44,448.024L692.684,448.024L680.118,448.024L663.363,448.024Z",
  OMAN_M:"M715.723,349.587L715.723,351.681L713.628,351.681L711.534,349.587L713.628,347.493L713.628,345.398L713.628,343.304L711.534,341.209L713.628,339.115L715.723,339.115L715.723,337.021L717.817,334.926L717.817,337.021L717.817,339.115L717.817,341.209L717.817,347.493L715.723,347.493Z",
  QATAR:"M611.003,372.625L608.909,372.625L604.72,372.625L602.625,370.531L600.531,368.437L600.531,360.059L600.531,355.87L602.625,349.587L604.72,343.304L606.814,341.209L611.003,339.115L615.192,345.398L617.286,347.493L615.192,353.776L617.286,362.153L615.192,366.342L613.097,370.531Z",
  KUWAIT:"M550.265,290.944L541.888,290.944L535.605,290.944L533.51,286.755L529.322,280.472L520.944,280.472L514.661,278.378L510.472,278.378L516.755,274.189L520.944,265.811L523.038,259.528L527.227,257.434L533.51,257.434L537.699,257.434L541.888,259.528L541.888,263.717L543.982,267.906L541.888,267.906L537.699,270L539.794,272.094L541.888,272.094L543.982,274.189L546.077,280.472L548.171,284.661Z",
  JORDAN:"M286.372,202.979L290.56,202.979L296.844,207.168L307.316,211.357L317.788,205.074L328.26,200.885L342.92,192.507L349.204,188.319L351.298,198.791L353.392,207.168L355.487,211.357L357.581,209.263L355.487,215.546L353.392,217.64L349.204,219.735L326.165,253.245L321.976,259.528L315.693,261.622L309.41,261.622L301.032,270L292.655,276.283L288.466,276.283L269.617,270L269.617,263.717L271.711,257.434L273.805,244.867L277.994,236.49L280.089,226.018L280.089,217.64L282.183,209.263Z",
  ISRAEL:"M288.466,188.319L286.372,190.413L288.466,194.602L288.466,198.791L286.372,200.885L284.277,202.979L282.183,205.074L277.994,207.168L269.617,215.546L269.617,221.829L267.522,228.112L271.711,230.206L277.994,232.301L275.9,242.773L271.711,257.434L269.617,267.906L263.333,259.528L259.145,251.15L254.956,238.584L254.956,232.301L259.145,226.018L267.522,205.074L271.711,196.696L277.994,194.602L280.089,190.413L284.277,190.413Z",
  LEBANON:"M280.089,194.602L280.089,190.413L282.183,190.413L286.372,188.319L288.466,186.224L290.56,184.13L290.56,179.941L294.749,179.941L298.938,179.941L298.938,173.658L303.127,171.563L298.938,165.28L296.844,163.186L290.56,163.186L288.466,165.28L282.183,171.563L280.089,177.847L277.994,186.224L275.9,194.602L273.805,194.602Z",
  SYRIA:"M288.466,135.959L294.749,138.053L301.032,129.676L303.127,119.204L313.599,119.204L328.26,117.109L345.015,117.109L363.864,119.204L384.808,112.92L401.563,110.826L414.13,108.732L420.413,106.637L422.507,110.826L416.224,119.204L401.563,127.581L401.563,135.959L399.469,148.525L399.469,158.997L393.186,167.375L376.431,175.752L359.676,184.13L342.92,192.507L328.26,200.885L313.599,207.168L298.938,209.263L292.655,207.168L288.466,198.791L288.466,188.319L288.466,182.035L290.56,179.941L298.938,179.941L298.938,173.658L298.938,165.28L296.844,161.091L290.56,163.186L288.466,152.714L286.372,138.053Z",
  EGYPT:"M309.41,427.08L273.805,427.08L240.295,427.08L204.69,427.08L196.313,422.891L185.841,427.08L185.841,385.192L185.841,337.021L185.841,290.944L185.841,255.339L185.841,230.206L204.69,228.112L213.068,232.301L225.634,236.49L236.106,236.49L252.861,232.301L259.145,249.056L267.522,267.906L257.05,293.038L248.673,305.605L231.917,286.755L223.54,272.094L219.351,272.094L223.54,284.661L240.295,309.794L263.333,355.87L280.089,389.381L286.372,410.324L307.316,424.985Z",
  TURKEY:"M405.752,91.976L424.602,91.976L445.546,91.976L470.678,91.976L468.584,91.976L462.301,94.071L470.678,100.354L474.867,110.826L462.301,112.92L456.018,106.637L435.074,106.637L420.413,106.637L397.375,110.826L355.487,119.204L330.354,117.109L309.41,117.109L303.127,129.676L290.56,135.959L294.749,117.109L277.994,121.298L242.389,129.676L208.879,125.487L185.841,123.392L185.841,112.92L185.841,91.976L213.068,91.976L271.711,91.976L319.882,91.976L374.336,91.976Z",
};
const MAP_CTRS = [
  {k:"IRAN",f:"#1a3020",s:"#2e5538",lx:657,ly:228,ls:11},
  {k:"IRAQ",f:"#162818",s:"#264828",lx:437,ly:176},
  {k:"SAUDI",f:"#141e16",s:"#243828",lx:458,ly:375},
  {k:"UAE",f:"#141e16",s:"#243828",lx:678,ly:364},
  {k:"OMAN",f:"#141e16",s:"#243828",lx:762,ly:396},
  {k:"OMAN_M",f:"#141e16",s:"#243828"},
  {k:"QATAR",f:"#141e16",s:"#243828"},
  {k:"KUWAIT",f:"#141e16",s:"#243828"},
  {k:"JORDAN",f:"#141e16",s:"#243828",lx:312,ly:239},
  {k:"ISRAEL",f:"#141828",s:"#2a3a5a",lx:259,ly:239},
  {k:"LEBANON",f:"#141828",s:"#2a3a5a"},
  {k:"SYRIA",f:"#162818",s:"#264828",lx:364,ly:144},
  {k:"EGYPT",f:"#141a14",s:"#1e3020",lx:228,ly:343},
  {k:"TURKEY",f:"#141a14",s:"#1e3020",lx:332,ly:102},
];

function TheaterMap() {
  const [day, setDay] = useState(-0.5);
  const [playing, setPlaying] = useState(false);
  const [hov, setHov] = useState(null);
  const pRef = useRef(null);
  const mx = 21;
  useEffect(() => {
    if (!playing) { clearInterval(pRef.current); return; }
    pRef.current = setInterval(() => setDay(d => { if (d >= mx) { setPlaying(false); return mx; } return d + 0.25; }), 120);
    return () => clearInterval(pRef.current);
  }, [playing]);
  // Same projection as d3.geoEquirectangular().center([46,29.5]).scale(1200).translate([500,270])
  const pj=(lo,la)=>[500+(lo-46)*20.944,270-(la-29.5)*20.944];

  const LOCS = [
    {n:"TEHRAN",lo:51.39,la:35.69,t:"cap"},{n:"ISFAHAN",lo:51.68,la:32.65,t:"tgt"},
    {n:"NATANZ",lo:51.73,la:33.51,t:"nuke"},{n:"BANDAR ABBAS",lo:56.27,la:27.19,t:"port"},
    {n:"KHARG IS.",lo:50.33,la:29.23,t:"key"},{n:"TEL AVIV",lo:34.78,la:32.08,t:"cap"},
    {n:"BEIRUT",lo:35.5,la:33.89,t:"city"},{n:"BAGHDAD",lo:44.37,la:33.31,t:"cap"},
    {n:"KUWAIT CITY",lo:47.98,la:29.38,t:"city"},{n:"BAHRAIN",lo:50.55,la:26.07,t:"key"},
    {n:"DOHA",lo:51.53,la:25.29,t:"city"},{n:"DUBAI",lo:55.27,la:25.2,t:"city"},
    {n:"MUSCAT",lo:58.59,la:23.58,t:"city"},{n:"RIYADH",lo:46.68,la:24.71,t:"city"},
    {n:"AL UDEID",lo:51.32,la:25.12,t:"base"},{n:"DAMASCUS",lo:36.29,la:33.51,t:"city"},
    {n:"CAMP ARIFJAN",lo:47.95,la:29.2,t:"base"},{n:"JEBEL ALI",lo:55.07,la:25.01,t:"port"},
    {n:"PRINCE SULTAN AB",lo:45.6,la:24.1,t:"base"},{n:"RAS TANURA",lo:50.0,la:26.6,t:"port"},
    {n:"HAIFA",lo:35.0,la:32.8,t:"city"},{n:"RAS LAFFAN",lo:51.5,la:25.9,t:"port"},
    {n:"S. PARS FIELD",lo:52.5,la:27.5,t:"port"},
  ];

  const EVTS = [
    // PRE-LAUNCH
    {d:-0.5,dt:"Feb 27",t:"TRUMP ISSUES FINAL ORDER",ds:"President orders Operation Epic Fury during nuclear negotiation window. Gang of Eight briefed. No Congressional vote.",at:[38.9,38.9],tp:"info",sr:"CSIS / Defense Update"},
    // DAY 1 - Feb 28
    {d:0,dt:"Feb 28",t:"~900 STRIKES IN 12 HOURS",ds:"US/Israel launch massive coordinated strikes using B-2s, B-1s, B-52s, Tomahawks, LUCAS drones, F-35s, F-22s. 1,700+ targets in first 72 hrs.",at:[52.5,34],tp:"strike",sr:"CENTCOM fact sheet"},
    {d:0,dt:"Feb 28",t:"KHAMENEI + OFFICIALS KILLED",ds:"Israeli decapitation strikes kill Supreme Leader, top officials, and family in Tehran compound.",at:[51.39,35.69],tp:"kill",sr:"White House / CENTCOM / Britannica"},
    {d:0,dt:"Feb 28",t:"GIRLS' SCHOOL HIT, MINAB",ds:"~170-180 killed in strike on school near Bandar Abbas. One of the war's first mass civilian casualty events.",at:[57.1,27.2],tp:"casualty",sr:"Flashpoint / Britannica"},
    {d:0,dt:"Feb 28",t:"BADESABA CALENDAR HACKED",ds:"Push notifications to 5M+ phones: 'Help has arrived.' Amnesty offers sent as cruise missiles land.",at:[51.39,35.69],tp:"cyber",sr:"WSJ / Wired / Schneier"},
    {d:0,dt:"Feb 28",t:"HORMUZ CLOSED",ds:"Iran shuts Strait of Hormuz. Explosive drone boats, mines, shore-based missiles. 20% of world oil.",at:[56.5,26.5],tp:"naval",sr:"Flashpoint / SOF News"},
    {d:0,dt:"Feb 28",t:"IRAN RETALIATES: GULF BASES",ds:"Ballistic missiles hit Jebel Ali (Dubai), Camp Arifjan (Kuwait), Al Udeid (Qatar), Ali Al Salem (Kuwait).",at:[51.32,25.12],tp:"retal",sr:"Flashpoint"},
    {d:0,dt:"Feb 28",t:"SHAHED HITS NSA BAHRAIN",ds:"Shahed-136 strikes radar at US Naval Support Activity, 5th Fleet HQ.",at:[50.55,26.07],tp:"retal",sr:"Flashpoint"},
    {d:0,dt:"Feb 28",t:"~125 MISSILES AT ISRAEL",ds:"Massive barrage. Civilian deaths in Tel Aviv and Haifa. Israel declares state of emergency.",at:[34.78,32.08],tp:"retal",sr:"Flashpoint / Britannica"},
    {d:0,dt:"Feb 28",t:"DUBAI AIRPORT SUSPENDED",ds:"Flights halted at DXB after nearby strikes. Port damage, fires reported across UAE.",at:[55.27,25.2],tp:"retal",sr:"Flashpoint"},
    // DAY 2 - Mar 1
    {d:1,dt:"Mar 1",t:"TEHRAN COMMAND CENTERS HIT",ds:"Strikes continue on command centers, air defenses. Intelligence heads killed. Hospitals and courts damaged.",at:[51.39,35.69],tp:"strike",sr:"Flashpoint / CNN"},
    {d:1,dt:"Mar 1",t:"9 KILLED IN BEIT SHEMESH",ds:"Iranian missiles kill 9, injure 65+ in Beit Shemesh. Hits also in Jerusalem area.",at:[34.98,31.75],tp:"retal",sr:"Flashpoint / Britannica"},
    {d:1,dt:"Mar 1",t:"HEZBOLLAH OPENS SECOND FRONT",ds:"Hezbollah launches attacks from Lebanon. Israel responds with strikes on Beirut suburbs.",at:[35.5,33.89],tp:"retal",sr:"Flashpoint"},
    {d:1,dt:"Mar 1",t:"IRAQI MILITIAS STRIKE US ASSETS",ds:"Iran-backed groups attack US positions in Iraq/Syria.",at:[44.37,33.31],tp:"retal",sr:"Flashpoint"},
    {d:1,dt:"Mar 1",t:"GULF PORTS/REFINERIES HIT",ds:"Iranian strikes damage ports, hotels, refineries, data centers across Gulf. Civilian casualties.",at:[55.07,25.01],tp:"retal",sr:"Flashpoint"},
    // DAY 3 - Mar 2
    {d:2,dt:"Mar 2",t:"NATANZ STRUCK (NON-RAD)",ds:"Nuclear facility damaged. IAEA confirms non-radiological impact. IRGC sites hit.",at:[51.73,33.51],tp:"strike",sr:"CSIS / IAEA"},
    {d:2,dt:"Mar 2",t:"QATAR LNG HALTED TEMPORARILY",ds:"Iranian attacks on Gulf energy infrastructure. Qatar LNG exports briefly stopped.",at:[51.53,25.29],tp:"retal",sr:"Flashpoint"},
    {d:2,dt:"Mar 2",t:"HEZBOLLAH DECLARES WAR",ds:"Responds to Khamenei's death. Full escalation from southern Lebanon.",at:[35.5,33.38],tp:"retal",sr:"Flashpoint"},
    {d:2,dt:"Mar 2",t:"US SERVICE MEMBER DEATHS",ds:"First confirmed US military fatalities reported.",at:[51.32,25.12],tp:"casualty",sr:"CENTCOM"},
    // DAY 4-7 - Mar 3-6
    {d:3,dt:"Mar 3",t:"IRGC DRONE CARRIER SUNK",ds:"IRIS Shahid Bagheri destroyed. Sea-based Shahed launch platform eliminated.",at:[56.0,26.8],tp:"strike",sr:"Defense Update"},
    {d:4,dt:"Mar 4",t:"IRIN DENA TORPEDOED",ds:"Iranian frigate sunk by US sub off Sri Lanka. 101 missing of 180 crew.",at:[59.5,24.5],tp:"strike",sr:"Defense Update"},
    {d:4,dt:"Mar 4",t:"F-35I DOWNS YAK-130 OVER TEHRAN",ds:"First F-35 air-to-air kill of manned aircraft in history.",at:[51.39,35.69],tp:"air",sr:"IDF / Times of Israel"},
    {d:5,dt:"Mar 5",t:"3 F-15Es FRIENDLY FIRE",ds:"Shot down by Kuwaiti F/A-18. All 6 crew eject safely. Bizarre coalition breakdown.",at:[47.98,29.38],tp:"casualty",sr:"CENTCOM / The War Zone"},
    {d:5,dt:"Mar 5",t:"5 KC-135s DAMAGED, SAUDI BASE",ds:"Iranian ballistic missile hits Prince Sultan Air Base. Tankers destroyed on ground.",at:[45.6,24.1],tp:"retal",sr:"SOF News / CNN"},
    {d:6,dt:"Mar 6",t:"IRANIAN SCHOOLS/HOSPITALS HIT",ds:"Civilian infrastructure struck across Iran. Hundreds of casualties mounting.",at:[52.5,33.5],tp:"casualty",sr:"Flashpoint / BBC"},
    // DAY 8-10 - Mar 7-9
    {d:7,dt:"Mar 7",t:"5,000 TARGETS STRUCK",ds:"CENTCOM confirms. Oil depots, missile sites, IRGC bases. Campaign tempo increasing.",at:[53,33],tp:"info",sr:"CENTCOM 10-day fact sheet"},
    {d:8,dt:"Mar 8",t:"MOJTABA KHAMENEI ELECTED",ds:"Temporary leadership council dissolved. Son of killed Supreme Leader chosen as successor.",at:[51.39,35.69],tp:"info",sr:"Defense Update / CNN"},
    {d:8,dt:"Mar 8",t:"BAHRAIN DESAL PLANT HIT",ds:"Iranian drone strikes desalination plant near Manama. Water infrastructure now targeted.",at:[50.55,26.07],tp:"retal",sr:"Hudson Institute"},
    {d:8,dt:"Mar 8",t:"ARAMCO RAS TANURA STRUCK",ds:"Energy infrastructure targeted systematically. Economic warfare escalating.",at:[50.0,26.6],tp:"retal",sr:"Flashpoint"},
    {d:9,dt:"Mar 9",t:"UAE: 1,440 DRONES INTERCEPTED",ds:"90% intercept rate. AH-64E Apaches hunting Shaheds. 253 ballistic missiles also fired at UAE.",at:[55.27,25.2],tp:"retal",sr:"Hudson Institute"},
    {d:9,dt:"Mar 9",t:"UNSC CONDEMNS IRAN GULF STRIKES",ds:"Security Council resolution passes. No ceasefire language.",at:[40,35],tp:"info",sr:"Hudson / UN"},
    // DAY 12-16 - Mar 9-16
    {d:12,dt:"Mar 12",t:"KC-135 CRASH, 6 KIA",ds:"Tanker down in western Iraq. All 6 crew confirmed killed. Not hostile or friendly fire.",at:[42.5,33.0],tp:"casualty",sr:"CENTCOM / Breaking Defense / TWZ"},
    {d:13,dt:"Mar 13",t:"ZELENSKY MEETS PAHLAVI IN PARIS",ds:"Ukraine's president meets exiled Shah's son. Discussed 'situation in Iran and region.'",at:[35.5,34.5],tp:"info",sr:"Zelensky / X"},
    {d:14,dt:"Mar 14",t:"USS TRIPOLI ENTERS S. CHINA SEA",ds:"31st MEU + 2,500 Marines steaming to Middle East from Okinawa. F-35Bs aboard.",at:[56.0,23.0],tp:"info",sr:"The Aviationist / OSINT"},
    {d:14,dt:"Mar 14",t:"LEBANON: 1M+ DISPLACED",ds:"Israel preps ground ops in southern Lebanon. Over 1 million displaced.",at:[35.5,33.38],tp:"casualty",sr:"Flashpoint / UNHCR"},
    // DAY 17+ - Mar 17-21
    {d:15,dt:"Mar 15",t:"ISFAHAN POUNDED, 15+ EXPLOSIONS",ds:"15 min bombardment. Intelligence Ministry, optical infrastructure, bridges hit.",at:[51.68,32.65],tp:"strike",sr:"Local reports / OSINT"},
    {d:15,dt:"Mar 15",t:"F/A-18s STRAFING CHABAHAR",ds:"Super Hornets operating freely at low altitude. Iranian airspace now permissive.",at:[60.5,25.3],tp:"air",sr:"OSINTtechnical"},
    {d:17,dt:"Mar 17",t:"ALI LARIJANI KILLED",ds:"Israeli strikes kill senior official in Tehran. IRGC Navy HQ also destroyed.",at:[51.39,35.69],tp:"kill",sr:"Flashpoint"},
    {d:17,dt:"Mar 17",t:"9+ BARRAGES AT ISRAEL",ds:"Cluster munitions impact central Israel. Civilian injuries and deaths reported.",at:[34.78,32.08],tp:"retal",sr:"Flashpoint"},
    {d:17,dt:"Mar 17",t:"ISRAEL GROUND OPS IN LEBANON",ds:"Limited IDF ground operations begin in southern Lebanon.",at:[35.3,33.1],tp:"strike",sr:"Flashpoint / IDF"},
    {d:18,dt:"Mar 18",t:"SOUTH PARS GAS FIELD STRUCK",ds:"Israel hits Iran's largest gas field. Massive economic escalation.",at:[52.5,27.5],tp:"strike",sr:"Flashpoint"},
    {d:18,dt:"Mar 18",t:"IRAN HITS RAS LAFFAN, QATAR",ds:"Retaliation on Qatari LNG facilities. Trump threatens further escalation.",at:[51.5,25.9],tp:"retal",sr:"Flashpoint"},
    {d:18,dt:"Mar 18",t:"HAIFA REFINERY DAMAGED",ds:"Iranian missiles damage refinery in Haifa area. Civilian casualties.",at:[35.0,32.8],tp:"retal",sr:"Flashpoint"},
    {d:19,dt:"Mar 19",t:"F-35A HIT BY IRANIAN SAM",ds:"Passive IR sensor. First US aircraft struck in war. Emergency landing, pilot stable.",at:[52.0,34.0],tp:"kill",sr:"CNN / Air & Space Forces"},
    {d:20,dt:"Mar 20",t:"NATANZ BUNKER-BUSTERS",ds:"US/Israel target remaining nuclear assets with deep-penetration munitions.",at:[51.73,33.51],tp:"strike",sr:"CSIS / CENTCOM"},
    {d:21,dt:"Mar 21",t:"NO CEASEFIRE. WAR CONTINUES.",ds:"21 days. Brent $112 (physical $138+). 5,000+ targets. 13+ US KIA. 1,400+ Iranian civilians dead. Strait contested.",at:[52.5,30],tp:"info",sr:"CENTCOM / Fortune / EIA"},
  ];

  const vis = EVTS.filter(e => e.d <= day);
  // FIX: For the detail panel, prefer point events over arc events, and show the TARGET of arcs
  const pointEvts = vis.filter(e => e.at);
  const cur = hov || (pointEvts.length ? pointEvts[pointEvts.length-1] : vis.length ? vis[vis.length-1] : null);
  const hormuz = day >= 0;
  const strk = vis.filter(e=>e.tp==="strike"||e.tp==="kill"||e.tp==="air").length;
  const rets = vis.filter(e=>e.tp==="retal").length;
  const dlbl = day < 0 ? "FEB 27" : day < 1 ? "FEB 28" : `MAR ${Math.min(Math.floor(day), 21)}`;

  return (
    <div style={{background:"#020408",borderBottom:"1px solid #1a1a1a"}}>
      <div style={{maxWidth:960,margin:"0 auto",padding:"16px 16px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",flexWrap:"wrap",gap:8,marginBottom:6}}>
          <div>
            <div style={{fontSize:9,letterSpacing:4,color:"#FF3B30",fontFamily:"monospace"}}>THEATER OF OPERATIONS</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"#fff",letterSpacing:2}}>OPERATION EPIC FURY</div>
          </div>
          <div style={{fontFamily:"monospace",fontSize:10,color:"#FF3B30"}}>DAY {Math.floor(day)} / {dlbl}</div>
        </div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap",padding:"6px 0 8px",borderTop:"1px solid #111",borderBottom:"1px solid #111"}}>
          {[{l:"EVENTS",v:vis.length,c:"#fff"},{l:"US/ISR STRIKES",v:strk,c:"#FF3B30"},{l:"IRAN RETALIATIONS",v:rets,c:"#FF6B35"},{l:"HORMUZ",v:hormuz?"CONTESTED":"OPEN",c:hormuz?"#FF3B30":"#2A9D3A"}].map((s,i) => (
            <div key={i} style={{fontFamily:"monospace",fontSize:8,letterSpacing:1.5,color:"#888"}}>{s.l}: <span style={{color:s.c,fontWeight:700}}>{s.v}</span></div>
          ))}
        </div>
      </div>
      <div style={{maxWidth:960,margin:"0 auto",position:"relative"}}>
        <svg viewBox="0 0 1000 540" style={{width:"100%",display:"block"}}>
          <rect width="1000" height="540" fill="#020408" />
          {/* Grid */}
          {[200,300,400,500,600,700,800].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="540" stroke="#0f2030" strokeWidth="0.4"/>)}
          {[100,200,300,400].map(y => <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="#0f2030" strokeWidth="0.4"/>)}
          {/* Water background for gulf area */}
          <ellipse cx="620" cy="330" rx="170" ry="70" fill="#081a30" />
          <ellipse cx="760" cy="390" rx="80" ry="50" fill="#081a30" opacity="0.7" />
          <rect x="180" y="100" width="90" height="200" fill="#081a30" opacity="0.4" />
          {/* Country shapes from Natural Earth 50m */}
          {MAP_CTRS.map((c,i) => (
            <g key={i}>
              <path d={MAP_PATHS[c.k]} fill={c.f} stroke={c.s} strokeWidth="1.2" />
              {c.lx && <text x={c.lx} y={c.ly} fill="#2a4a55" fontSize={c.ls||7} fontFamily="monospace" textAnchor="middle" letterSpacing="3">{c.k.replace("_M","")}</text>}
            </g>
          ))}
          {/* Water labels */}
          <text x="605" y="310" fill="#0f3565" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="4" fontWeight="700">PERSIAN GULF</text>
          <text x="765" y="380" fill="#0f3565" fontSize="6" fontFamily="monospace" textAnchor="middle" letterSpacing="3">GULF OF OMAN</text>
          {/* Strait of Hormuz */}
          {(() => {const [hx,hy]=pj(56.5,26.5);return <g>
            <ellipse cx={hx} cy={hy} rx="30" ry="18" fill="none" stroke={hormuz?"#FF3B30":"#2A9D3A"} strokeWidth="1" strokeDasharray="4 3" opacity="0.6">{hormuz&&<animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>}</ellipse>
            <text x={hx} y={hy-22} fill="#FF3B30" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="2" fontWeight="700">STRAIT OF HORMUZ</text>
            <text x={hx} y={hy+30} fill="#888" fontSize="6" fontFamily="monospace" textAnchor="middle">{hormuz?"CONTESTED":"OPEN"} / 20% WORLD OIL</text>
          </g>})()}
          {/* Kharg Island */}
          {(() => {const [kx,ky]=pj(50.33,29.23);return <g>
            <circle cx={kx} cy={ky} r="3" fill="#FF6B35" />
            <text x={kx+8} y={ky-4} fill="#FF3B30" fontSize="7" fontFamily="monospace" letterSpacing="1.5" fontWeight="700">KHARG ISLAND</text>
            <text x={kx+8} y={ky+6} fill="#888" fontSize="5.5" fontFamily="monospace">90% IRAN OIL EXPORTS</text>
          </g>})()}
          {/* City markers */}
          {LOCS.map((l,i) => {const [x,y]=pj(l.lo,l.la);const hit=vis.some(e=>e.at&&Math.abs(e.at[0]-l.lo)<0.8&&Math.abs(e.at[1]-l.la)<0.8);const r=l.t==="cap"?3:l.t==="nuke"?2.5:l.t==="key"?2.5:l.t==="base"?2:1.5;const fl=l.t==="cap"?"#fff":l.t==="nuke"?"#FF6B35":l.t==="key"?"#FF6B35":l.t==="base"?"#3478F6":"#888";return (
            <g key={i}>
              {hit&&<circle cx={x} cy={y} r="10" fill="#FF3B30" opacity="0.12"><animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite"/></circle>}
              <circle cx={x} cy={y} r={r} fill={fl} opacity={hit?1:0.7}/>
              <text x={x+(l.lo<40?-6:6)} y={y+3} fill={l.t==="cap"||hit?"#fff":"#bbb"} fontSize={l.t==="cap"?7:6} fontFamily="monospace" textAnchor={l.lo<40?"end":"start"} letterSpacing="1" fontWeight={l.t==="cap"?700:400}>{l.n}</text>
            </g>
          )})}
          {/* Point events */}
          {vis.filter(e=>e.at).map((e,i) => {const [x,y]=pj(e.at[0],e.at[1]);const col=e.tp==="kill"?"#FF3B30":e.tp==="retal"?"#FF6B35":e.tp==="naval"?"#3478F6":e.tp==="casualty"?"#F5A623":e.tp==="cyber"?"#8B6FD4":"#FF3B30";return (
            <g key={`e${i}`} onMouseEnter={()=>setHov(e)} onMouseLeave={()=>setHov(null)} style={{cursor:"pointer"}}>
              <circle cx={x} cy={y} r={e.tp==="kill"?8:5} fill={col} opacity="0.15"><animate attributeName="r" values={e.tp==="kill"?"6;14;6":"4;9;4"} dur="2s" repeatCount="indefinite"/></circle>
              {e.tp==="kill"?<><line x1={x-3} y1={y-3} x2={x+3} y2={y+3} stroke={col} strokeWidth="1.5"/><line x1={x+3} y1={y-3} x2={x-3} y2={y+3} stroke={col} strokeWidth="1.5"/></>:<circle cx={x} cy={y} r="1.5" fill={col}/>}
            </g>
          )})}
          {/* Scale + Legend */}
          <line x1="30" y1="525" x2="130" y2="525" stroke="#333" strokeWidth="1"/>
          <text x="80" y="520" fill="#444" fontSize="6" fontFamily="monospace" textAnchor="middle">~500 KM</text>
          <g transform="translate(30,18)">{[["US/ISR STRIKE","#FF3B30"],["IRAN RETAL.","#FF6B35"],["AIR","#3478F6"],["CASUALTY","#F5A623"],["CYBER","#8B6FD4"]].map(([l,c],i) => <g key={i} transform={`translate(${Math.floor(i/3)*110},${(i%3)*12})`}><circle cx="4" cy="0" r="2.5" fill={c} opacity="0.6"/><text x="10" y="3" fill="#888" fontSize="5.5" fontFamily="monospace" letterSpacing="0.5">{l}</text></g>)}</g>
          <defs><pattern id="scn" width="4" height="4" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="4" y2="0" stroke="#fff" strokeWidth="0.3" opacity="0.02"/></pattern></defs>
          <rect width="1000" height="540" fill="url(#scn)"/>
        </svg>
        {cur&&<div style={{position:"absolute",top:12,right:12,background:"rgba(2,4,8,0.92)",border:"1px solid #1a1a2a",borderLeft:`2px solid ${cur.tp==="strike"||cur.tp==="kill"?"#FF3B30":cur.tp==="retal"?"#FF6B35":"#3478F6"}`,padding:"10px 14px",maxWidth:250,borderRadius:2}}>
          <div style={{fontSize:7,color:"#888",fontFamily:"monospace",marginBottom:4}}>{cur.dt} / DAY {cur.d}</div>
          <div style={{fontSize:11,color:"#fff",fontWeight:700,fontFamily:"monospace",marginBottom:4,lineHeight:1.3}}>{cur.t}</div>
          <div style={{fontSize:9,color:"#ccc",lineHeight:1.4,marginBottom:4}}>{cur.ds}</div>
          <div style={{fontSize:7,color:"#555",fontFamily:"monospace"}}>{cur.sr}</div>
        </div>}
      </div>
      <div style={{maxWidth:960,margin:"0 auto",padding:"10px 16px 16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>{if(day>=mx)setDay(-0.5);setPlaying(!playing)}} style={{background:"none",border:"1px solid #333",color:playing?"#FF3B30":"#fff",padding:"4px 10px",fontSize:8,fontFamily:"monospace",letterSpacing:2,cursor:"pointer",borderRadius:2}}>{playing?"PAUSE":day>=mx?"REPLAY":"PLAY"}</button>
          <input type="range" min="-0.5" max={mx} step="0.25" value={day} onChange={e=>{setDay(+e.target.value);setPlaying(false)}} style={{flex:1,accentColor:"#FF3B30"}}/>
          <span style={{fontSize:9,color:"#888",fontFamily:"monospace",minWidth:60,textAlign:"right"}}>{dlbl}</span>
        </div>
        <div style={{position:"relative",height:12,margin:"4px 58px 0 68px"}}>
          {EVTS.map((e,i) => <div key={i} onClick={()=>{setDay(e.d);setPlaying(false)}} style={{position:"absolute",left:`${((e.d+0.5)/(mx+0.5))*100}%`,top:0,width:2,height:e.tp==="kill"?11:e.tp==="strike"?9:e.tp==="retal"?8:6,background:e.d<=day?"#FF3B30":"#333",cursor:"pointer",transform:"translateX(-1px)",borderRadius:1}} title={`${e.dt}: ${e.t}`}/>)}
        </div>
      </div>
    </div>
  );
}

function SankeyDiagram() {
  const flows = [
    {to:"AIR OPERATIONS",v:1.2,c:"#FF3B30",d:"Fighter sorties, bombers, tankers, munitions"},
    {to:"MISSILE DEFENSE",v:0.7,c:"#3478F6",d:"PAC-3 at $3.9M/shot, THAAD interceptors"},
    {to:"NAVAL OPS",v:0.5,c:"#2A9D3A",d:"2 carrier groups, escorts, Hormuz patrols"},
    {to:"GROUND/LOGISTICS",v:0.35,c:"#FF6B35",d:"Supply chains, base defense, transport"},
    {to:"ISR + INTEL",v:0.2,c:"#8B6FD4",d:"Satellites, SIGINT, MQ-9 surveillance"},
    {to:"CYBER/PSYOPS",v:0.1,c:"#F5A623",d:"BadeSaba, info warfare, cyber ops"},
  ];
  const total = flows.reduce((s,f)=>s+f.v,0);
  let cumY = 0;
  return (
    <div style={{margin:"36px 0",background:"#060610",border:"1px solid #1a1a2a",borderRadius:4,padding:16}}>
      <div style={{fontSize:9,letterSpacing:4,color:"#FF3B30",fontFamily:"monospace",marginBottom:8}}>PENTAGON DAILY BURN RATE</div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"#fff",letterSpacing:2,marginBottom:4}}>$3.1 BILLION / DAY</div>
      <div style={{fontSize:10,color:"#ccc",marginBottom:16}}>Estimated operational cost breakdown, weeks 1-3</div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {flows.map((f,i) => {
          const pct = Math.round((f.v/total)*100);
          return (
            <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:100,textAlign:"right",fontSize:8,color:"#aaa",fontFamily:"monospace",flexShrink:0}}>{f.to}</div>
              <div style={{flex:1,height:22,background:"#0a0a18",borderRadius:2,overflow:"hidden",position:"relative"}}>
                <div style={{height:"100%",width:`${pct}%`,background:f.c,opacity:0.4,borderRadius:2}}/>
                <div style={{position:"absolute",left:8,top:0,bottom:0,display:"flex",alignItems:"center",fontSize:10,color:"#fff",fontWeight:700,fontFamily:"monospace"}}>${f.v}B</div>
              </div>
              <div style={{width:120,fontSize:7,color:"#888",fontFamily:"monospace",flexShrink:0}}>{f.d}</div>
            </div>
          );
        })}
      </div>
      <div style={{fontSize:7,color:"#555",fontFamily:"monospace",marginTop:10,textAlign:"center"}}>Sources: CSIS, Congressional Research Service, Raytheon/MDAA, DoD. 3-week est. total: ~$65B</div>
    </div>
  );
}

function ImageCard({ caption, source, description, imgUrl }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{border:"1px solid #1a1a1a",borderRadius:3,overflow:"hidden",flex:1,minWidth:0}}>
      {imgUrl && !err ? (
        <img src={imgUrl} alt={caption} onError={() => setErr(true)} style={{width:"100%",height:220,objectFit:"cover",display:"block",opacity:0.95,filter:"grayscale(10%)"}} />
      ) : (
        <div style={{background:"#111",height:220,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{textAlign:"center",padding:20}}>
            <div style={{fontSize:18,marginBottom:8}}>📷</div>
            <div style={{fontSize:8,color:"#555",fontFamily:"monospace",letterSpacing:2}}>IMAGE: {caption.toUpperCase()}</div>
            <div style={{fontSize:7,color:"#444",fontFamily:"monospace",marginTop:4}}>Available in deployed version</div>
          </div>
        </div>
      )}
      <div style={{padding:"12px 14px",background:"#0a0a0a"}}>
        <div style={{fontSize:12,fontWeight:600,color:"#fff",marginBottom:4,fontFamily:"monospace"}}>{caption}</div>
        <div style={{fontSize:10,color:"#ccc",lineHeight:1.5,marginBottom:6}}>{description}</div>
        <div style={{fontSize:7,color:"#FF3B30",fontFamily:"monospace",letterSpacing:1}}>REAL IMAGE · {source}</div>
      </div>
    </div>
  );
}

function SideBySide({ left, right }) {
  return (
    <div style={{display:"flex",gap:12,margin:"28px auto",maxWidth:640,alignItems:"stretch"}}>
      <div style={{flex:1,minWidth:0}}>{left}</div>
      <div style={{flex:1,minWidth:0}}>{right}</div>
    </div>
  );
}

function RenderText({ text }) {
  const parts = [];
  const rx = /\*\*(.+?)\*\*/g;
  let last = 0;
  let match;
  while ((match = rx.exec(text)) !== null) {
    if (match.index > last) parts.push(<span key={last}>{text.slice(last, match.index)}</span>);
    parts.push(<strong key={match.index} style={{ color: "#fff", fontWeight: 600 }}>{match[1]}</strong>);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(<span key={last}>{text.slice(last)}</span>);
  return (<>{parts}</>);
}

export default function App() {
  const [mSel, setMS] = useState("shahed");
  const [mFil, setMF] = useState(null);
  const [ci, setCI] = useState(1);
  const d = DUR[ci];
  const mv = mFil ? MS.filter(x => mFil === "C" ? x.cn < 1e5 : mFil === "E" ? x.cn > 1e6 : x.co === mFil) : MS;
  const ml = Math.max(...mv.map(x => x.len));
  const sc = 240 / ml;
  const sm = MS.find(x => x.id === mSel) || MS[0];

  return (
    <div style={{ background: "#0a0a0a", color: "#fff", fontFamily: "Georgia, serif", minHeight: "100vh" }}>
      <style>{`*{margin:0;padding:0;box-sizing:border-box}::selection{background:rgba(255,59,48,.3);color:#fff}`}</style>

      {/* HERO */}
      <div style={{ minHeight: "55vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "50px 24px", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ fontSize: 9, letterSpacing: 5, color: "#FF3B30", fontFamily: "monospace", marginBottom: 18 }}>A DIGITAL MUSEUM OF ASYMMETRIC WARFARE</div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(44px,9vw,100px)", lineHeight: 0.9, letterSpacing: 3, color: "#fff", marginBottom: 12 }}>WAR ON<br />EVERY SCREEN</h1>
        <p style={{ fontSize: 18, fontStyle: "italic", color: "#ccc", fontWeight: 300, marginBottom: 28 }}>Surrendering to the Machine</p>
        <div style={{ width: 40, height: 1, background: "#555", marginBottom: 16 }} />
        <div style={{ fontSize: 8, color: "#888", letterSpacing: 3, fontFamily: "monospace" }}>DRAFT · MARCH 2026</div>
      </div>

      {/* THEATER MAP */}
      <TheaterMap />

      {/* MEDIA MONTAGE */}
      <div style={{ borderBottom: "1px solid #1a1a1a", padding: "40px 20px 50px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 9, letterSpacing: 5, color: "#FF3B30", fontFamily: "monospace", marginBottom: 10 }}>MODERN WARFARE</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 42, color: "#fff", letterSpacing: 2, lineHeight: 1, marginBottom: 6 }}>THE BROADCAST WALL</h2>
          <p style={{ fontSize: 14, color: "#ccc", fontStyle: "italic", marginBottom: 28 }}>Nine screens. Three weeks. The war as it played across every channel simultaneously.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 6, background: "#000", padding: 6, borderRadius: 2 }}>
            {CLIPS.map((c, i) => {
              const getYtId = (u) => { if (!u) return null; const m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/); return m ? m[1] : null; };
              const ytId = getYtId(c.url);
              const isX = c.url && (c.url.includes('x.com') || c.url.includes('twitter.com'));
              const isCNN = c.url && c.url.includes('cnn.com') && c.url.includes('video');
              return (
              <div key={i} style={{
                background: "#0a0a0a", border: "1px solid #222", borderRadius: 3, overflow: "hidden",
                position: "relative", display: "flex", flexDirection: "column"
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: c.c, opacity: 0.6, zIndex: 1 }} />
                {ytId ? (
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", background: "#000" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                      title={c.title}
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : isX ? (
                  <div style={{ background: "#000", height: 140, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    onClick={() => window.open(c.url, '_blank')}>
                    <div style={{ textAlign: "center", padding: 12 }}>
                      <div style={{ fontSize: 22, marginBottom: 6, color: "#fff" }}>\ud835\udd4f</div>
                      <div style={{ fontSize: 8, color: "#1DA1F2", fontFamily: "monospace", letterSpacing: 1 }}>VIEW LIVE POST \u25b6</div>
                    </div>
                  </div>
                ) : isCNN ? (
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", background: "#111" }}>
                    <iframe src={c.url} title={c.title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }} allowFullScreen />
                  </div>
                ) : c.url ? (
                  <div style={{ background: "#111", height: 100, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    onClick={() => window.open(c.url, '_blank')}>
                    <div style={{ textAlign: "center", padding: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF3B30", boxShadow: "0 0 8px #FF3B30", margin: "0 auto 8px" }} />
                      <div style={{ fontSize: 8, color: "#FF3B30", fontFamily: "monospace", letterSpacing: 1 }}>VIEW SOURCE \u25b6</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ background: "#0d0d0d", height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.c, boxShadow: `0 0 6px ${c.c}` }} />
                  </div>
                )}
                <div style={{ padding: "8px 10px", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF3B30", boxShadow: "0 0 4px #FF3B30" }} />
                      <span style={{ fontSize: 7, letterSpacing: 2, color: c.c, fontFamily: "monospace", fontWeight: 700 }}>{c.type}</span>
                    </div>
                    <span style={{ fontSize: 7, color: "#888", fontFamily: "monospace" }}>{c.date}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#fff", fontWeight: 600, marginBottom: 4, lineHeight: 1.3, fontFamily: "monospace" }}>{c.title}</div>
                  <div style={{ fontSize: 9, color: "#ccc", lineHeight: 1.5, marginBottom: 5 }}>{c.detail}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 7, color: "#888", fontFamily: "monospace" }}>
                    <span>{c.src}</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      {c.views && <span style={{ color: c.c }}>{c.views} views</span>}
                      {c.url && <span style={{ color: "#FF3B30", fontWeight: 700 }}>LIVE \u25b6</span>}
                    </div>
                  </div>
                </div>
              </div>
            );})}
          </div>
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <span style={{ fontSize: 7, letterSpacing: 3, color: "#444", fontFamily: "monospace" }}>LIVE BROADCASTS · ALL CHANNELS · ALL SCREENS · EMBEDDED FEEDS</span>
          </div>
        </div>
      </div>

      {/* ACTS + INTERACTIVES */}
      {ESSAY.map((act, ai) => (
        <div key={ai}>
          <div style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px" }}>
              <div style={{ fontSize: 9, letterSpacing: 5, color: "#FF3B30", fontFamily: "monospace", marginBottom: 12 }}>ACT {act.act}</div>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(30px,5vw,52px)", lineHeight: 0.95, letterSpacing: 2, color: "#fff", marginBottom: 32 }}>{act.title}</h2>
              {act.paras.map((p, pi) => {
                const bold = p.startsWith("**") || p.startsWith("That myth") || p.startsWith("Asymmetric warfare");
                const short = p.split(" ").length < 20;
                return (
                  <React.Fragment key={pi}>
                    <p style={{ fontSize: bold && short ? 19 : 16, lineHeight: 1.85, color: "#fff", fontWeight: 300, marginBottom: short && bold ? 26 : 20, maxWidth: 640 }}>
                      <RenderText text={p} />
                    </p>
                    {/* BadeSaba after "On the morning of February..." paragraph (Act III, para 6) */}
                    {ai === 2 && pi === 6 && <BadeSabaNotification />}
                    {/* Sankey after "But the single most devastating..." paragraph (Act IV, para 6) */}
                    {ai === 3 && pi === 6 && <SankeyDiagram />}
                    {/* Humanoid robot rendering after "Read that again" (Act I, para 4) */}
                    {ai === 0 && pi === 4 && (
                      <SideBySide
                        left={<Model3D build={buildHumanoid} h={220} cap="3D MODEL · DRAG TO ROTATE · COMPARE WITH REAL IMAGE →" />}
                        right={<ImageCard caption="Phantom MK-1" source="Foundation (San Francisco) / Time" description="First humanoid robot deployed to an active warzone. Five foot nine. Carries a rifle. Arrived Ukraine February 2026 for battlefield evaluation." imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Phantom_MK-1.jpg/640px-Phantom_MK-1.jpg" />}
                      />
                    )}
                  </React.Fragment>
                );
              })}

              {/* 3D models + images in Act I */}
              {ai === 0 && (
                <>
                  <div style={{margin:"24px auto",maxWidth:520}}>
                    <ImageCard caption="Ukrainian exoskeleton" source="7th Air Assault Corps, Pokrovsk, Mar 20, 2026" description="Soldiers of the 147th Artillery Brigade loading Bohdana howitzer shells in powered exoskeleton frames. Reduces strain by 30%, allows 20 km/h movement." imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/VIATRIX_Powered_Exoskeleton.jpg/640px-VIATRIX_Powered_Exoskeleton.jpg" />
                  </div>
                  <SideBySide
                    left={<Model3D build={buildDrone} h={200} cap="3D MODEL · DRAG TO ROTATE · COMPARE WITH REAL IMAGE →" />}
                    right={<ImageCard caption="FPV drone with RPG warhead" source="Ukrainian Armed Forces / Telegram" description="A hobbyist quadcopter with an RPG warhead zip-tied underneath. $400. Built with a soldering iron. Responsible for 65% of Russian tank kills. Ukraine produces 9,000 per day." imgUrl="https://upload.wikimedia.org/wikipedia/commons/4/4b/Ukrainian_FPV-drone.jpg" />}
                  />
                  <SideBySide
                    left={<Model3D build={buildShahed} h={200} cap="3D MODEL · DRAG TO ROTATE · COMPARE WITH REAL IMAGE →" />}
                    right={<ImageCard caption="Shahed-136 loitering munition" source="IRGC / Iran Watch" description="Delta-winged, 3.5m long, launched in swarms of five from flatbed trucks. $20-50K per unit. Its warhead equals five 155mm shells. A Patriot interceptor to shoot one down costs $3.9M." imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Shahed_136_at_the_IRGC_exhibition.jpg/640px-Shahed_136_at_the_IRGC_exhibition.jpg" />}
                  />
                </>
              )}

              {/* Images in Act II */}
              {ai === 1 && (
                <div style={{margin:"24px auto",maxWidth:520}}>
                  <ImageCard caption="Russian soldiers surrender to ground robot" source="Ukrainian MOD / Telegram, 2026" description="Three bloodied soldiers emerge from a bombed structure and raise their hands to an armed UGV. Humans capitulating to a machine." imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Ukrainian_UGV_in_combat.jpg/640px-Ukrainian_UGV_in_combat.jpg" />
                </div>
              )}

              {/* Compression timeline + video embeds in Act III (BadeSaba now inline above) */}
              {ai === 2 && (
                <>
                  <CompressionTimeline />
                  <VideoEmbed
                    title="Walter Cronkite: 'We are mired in stalemate'"
                    source="CBS Evening News, February 27, 1968"
                    description="A month after the Tet Offensive, Cronkite told America the war was unwinnable. Johnson reportedly said: 'If I've lost Cronkite, I've lost Middle America.' One man, one broadcast, one opinion. That was the speed of narrative."
                    timestamp="Feb 27, 1968"
                    url="https://www.youtube.com/watch?v=gc-lyAG4bkM"
                  />
                  <VideoEmbed
                    title="White House: Call of Duty kill scores over real Iran strikes"
                    source="White House X account · 58M+ views"
                    description="Childish Gambino's 'Bonfire.' Kill score overlays after each real explosion. 'We're winning this fight.' No indication which footage is real and which is from the game. Official US government communication."
                    timestamp="Mar 5, 2026"
                    url="https://x.com/WhiteHouse/status/2029307088808055083"
                  />
                  <VideoEmbed
                    title="Iran's Kharazi on CNN: 'False narrative'"
                    source="CNN / Frederik Pleitgen, filmed inside Iran"
                    description="Foreign policy advisor Kamal Kharazi, composed and statesmanlike: 'It is a false narrative that Iranian capabilities have been degraded. There is no room for diplomacy anymore.' Airing the same day as the White House meme videos."
                    timestamp="Mar 9, 2026"
                    url="https://www.cnn.com/2026/03/09/world/video/iran-kamal-kharazi-no-diplomacy-vrtc"
                  />
                  <VideoEmbed
                    title="Tucker Carlson: Joe Kent reveals why we went to war"
                    source="Tucker Carlson Show · 121 minutes"
                    description="Former NCTC Director, 20-yr Army, 11 combat deployments, Gold Star husband: 'There was no intelligence that showed an imminent threat from Iran to the United States.' The most significant public break from a senior intelligence official since the war began."
                    timestamp="Mar 18, 2026"
                    url="https://www.cnn.com/2026/03/18/politics/joe-kent-iran-tucker-carlson"
                  />
                  <VideoEmbed
                    title="Trump: 'We don't need anybody. We're the strongest.'"
                    source="Truth Social · While zero allied nations had joined"
                    description="Germany's defense minister: 'It is not our war.' France's ambassador: allies won't be at his 'beck and call' when the request comes as 'You're useless, we don't need you, but come.' NATO strained past diplomatic language."
                    timestamp="Mar 2026"
                    url="https://truthsocial.com/@realDonaldTrump/posts/116245182325726375"
                  />
                </>
              )}

              {/* F-35 model + cost context images in Act IV */}
              {ai === 3 && (
                <>
                  <SideBySide
                    left={<Model3D build={buildF35} h={220} cap="3D MODEL · DRAG TO ROTATE · COMPARE WITH REAL IMAGE →" />}
                    right={<ImageCard caption="F-35A Lightning II" source="USAF / Air & Space Forces Magazine" description="$100M per unit. $1.7 trillion program. 30 amassed in theater. On March 19, struck by a passive IR SAM (est. $50-200K). Stealth coating irrelevant: the sensor was looking for heat." imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/F-35A_flight_%28cropped%29.jpg/640px-F-35A_flight_%28cropped%29.jpg" />}
                  />
                  <div style={{margin:"24px auto",maxWidth:520}}>
                    <ImageCard caption="Iranian explosive drone boat" source="SOF News / Fox News, Mar 13, 2026" description="Explosive 'suicide skiffs' disguised as fishing boats. Encryption, frequency-hopping, satellite-guided waypoints. The US Navy, the most powerful maritime force in history, is being bled by speedboats that cost less than a used car." />
                  </div>
                </>
              )}

              {/* Evolution of the soldier 3D rendering in Act VI */}
              {ai === 5 && (
                <EvolutionStepper />
              )}
            </div>
          </div>

          {/* MISSILE COMPARISON after Act II */}
          {ai === 1 && (
            <div style={{ borderBottom: "1px solid #1a1a1a", padding: "50px 20px" }}>
              <div style={{ maxWidth: 680, margin: "0 auto 24px", textAlign: "center" }}>
                <div style={{ fontSize: 9, letterSpacing: 5, color: "#FF3B30", fontFamily: "monospace", marginBottom: 10 }}>INTERACTIVE EXHIBIT</div>
                <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 42, color: "#fff", letterSpacing: 2, marginBottom: 8 }}>THE MISSILES</h2>
                <p style={{ fontSize: 14, color: "#ccc", fontStyle: "italic" }}>Eight systems at relative scale. Click any missile. Filter by nation or cost. The ratio is the argument.</p>
              </div>
              <div style={{ background: "#060610", border: "1px solid #1a1a2a", borderRadius: 4, maxWidth: 860, margin: "0 auto" }}>
                <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #1a1a2a", overflowX: "auto" }}>
                  {[["All", null], ["Iran", "IRAN"], ["USA", "USA"], ["Israel", "ISRAEL"], ["<$100K", "C"], [">$1M", "E"]].map(([l, v]) => (
                    <button key={l} onClick={() => { setMF(v); const v2 = v ? MS.filter(x => v === "C" ? x.cn < 1e5 : v === "E" ? x.cn > 1e6 : x.co === v) : MS; if (v2.length && !v2.find(x => x.id === mSel)) setMS(v2[0].id); }}
                      style={{ padding: "8px 12px", fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", border: "none", background: mFil === v ? "rgba(255,255,255,.05)" : "none", color: mFil === v ? "#fff" : "#ccc", borderBottom: mFil === v ? "2px solid #FF3B30" : "2px solid transparent", fontFamily: "monospace", whiteSpace: "nowrap" }}>{l}</button>
                  ))}
                </div>
                <div style={{ position: "relative", height: 300, background: "linear-gradient(180deg,#060610,#0a0a18)", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(40,80,180,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(40,80,180,.08) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140, background: "radial-gradient(ellipse at 50% 100%,rgba(20,60,160,.12),transparent 70%)" }} />
                  <div style={{ position: "absolute", bottom: 45, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "flex-end", padding: "0 10px" }}>
                    {mv.map(mi => {
                      const h = Math.max(16, mi.len * sc);
                      const sel = mi.id === mSel;
                      return (
                        <div key={mi.id} onClick={() => setMS(mi.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: 100, cursor: "pointer", opacity: sel ? 1 : 0.4, transition: "opacity .3s" }}>
                          <div style={{ position: "relative", height: h }}>
                            <div style={{ width: 11, height: h, borderRadius: "5px 5px 2px 2px", background: `linear-gradient(180deg,${mi.c}dd,${mi.c}44)`, border: `1px solid ${mi.c}55`, boxShadow: sel ? `0 0 8px ${mi.c}33` : "none" }}>
                              <div style={{ width: 0, height: 0, borderLeft: "5.5px solid transparent", borderRight: "5.5px solid transparent", borderBottom: `9px solid ${mi.c}cc`, position: "absolute", top: -7 }} />
                            </div>
                          </div>
                          <div style={{ marginTop: 8, textAlign: "center" }}>
                            <div style={{ fontSize: 7, color: sel ? "#fff" : "#ccc", fontWeight: 500, fontFamily: "monospace" }}>{mi.name}</div>
                            <div style={{ fontSize: 8, color: mi.c, fontWeight: 700, marginTop: 1, fontFamily: "monospace" }}>{mi.cost}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ padding: "10px 14px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 6, borderTop: "1px solid #1a1a2a" }}>
                  {[{ l: "TYPE", v: sm.type }, { l: "RANGE", v: sm.rng }, { l: "SPEED", v: sm.spd }, { l: "WARHEAD", v: sm.wh }, { l: "WEIGHT", v: sm.wt }, { l: "COST", v: sm.cost }].map((s, i) => (
                    <div key={i} style={{ padding: 7, border: "1px solid #1a1a2a", borderRadius: 2, background: "rgba(255,255,255,.02)" }}>
                      <div style={{ fontSize: 6, color: "#aaa", letterSpacing: 2, fontFamily: "monospace", marginBottom: 2 }}>{s.l}</div>
                      <div style={{ fontSize: 11, color: "#fff", fontWeight: 700, fontFamily: "monospace" }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "6px 14px 10px", borderTop: "1px solid #0f0f1a" }}>
                  <div style={{ fontSize: 8, color: "#ccc", lineHeight: 1.5, fontFamily: "monospace" }}>{sm.note}</div>
                  <div style={{ fontSize: 7, color: "#888", fontFamily: "monospace", marginTop: 3 }}>Source: {sm.src}</div>
                </div>
              </div>
            </div>
          )}

          {/* CALCULATOR after Act III (above Act IV) */}
          {ai === 2 && (
            <div style={{ borderBottom: "1px solid #1a1a1a", padding: "50px 20px" }}>
              <div style={{ maxWidth: 680, margin: "0 auto 24px", textAlign: "center" }}>
                <div style={{ fontSize: 9, letterSpacing: 5, color: "#FF3B30", fontFamily: "monospace", marginBottom: 10 }}>INTERACTIVE EXHIBIT</div>
                <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 42, color: "#fff", letterSpacing: 2, marginBottom: 8 }}>THE COST CALCULATOR</h2>
                <p style={{ fontSize: 14, color: "#ccc", fontStyle: "italic" }}>Drag the slider to project cascading economic and human consequences across time.</p>
              </div>
              <div style={{ background: "#060610", border: "1px solid #1a1a2a", borderRadius: 4, maxWidth: 860, margin: "0 auto", padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <input type="range" min={0} max={4} value={ci} onChange={e => setCI(+e.target.value)} style={{ flex: 1, accentColor: "#FF3B30" }} />
                  <span style={{ fontSize: 16, color: "#fff", fontWeight: 700, fontFamily: "monospace", minWidth: 90 }}>{d.l}</span>
                </div>
                <div style={{ fontSize: 7, color: "#FF3B30", fontFamily: "monospace", letterSpacing: 2, marginBottom: 10 }}>ENERGY & TRADE</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 8, marginBottom: 12 }}>
                  {[
                    { l: "BRENT CRUDE (PAPER)", v: `$${d.brent}/bbl`, c: "#FF6B35", s: "Pre-war: $72 (Fortune/EIA)" },
                    { l: "PHYSICAL DELIVERY", v: `$${d.physD}/bbl`, c: "#FF3B30", s: "Dubai/Murban (ENB)" },
                    { l: "US GAS AVERAGE", v: `$${d.gas}/gal`, s: `CA: $${d.gasCa} (AAA)` },
                    { l: "FERTILIZER (UREA)", v: `$${d.fert}/mt`, c: "#FF6B35", s: "Pre-war: $475 (CNBC)" },
                    { l: "SPR RESERVES", v: `${d.spr}M bbl`, s: "Started: 415M (DOE)" },
                    { l: "SHIP ATTACKS", v: d.ship, c: "#FF6B35", s: "Hormuz/Gulf (Lloyd's)" },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: 8, border: "1px solid #1a1a2a", borderRadius: 2, background: "rgba(255,255,255,.02)" }}>
                      <div style={{ fontSize: 6, color: "#aaa", letterSpacing: 2, fontFamily: "monospace", marginBottom: 2 }}>{s.l}</div>
                      <div style={{ fontSize: 14, color: s.c || "#fff", fontWeight: 700, fontFamily: "monospace" }}>{s.v}</div>
                      {s.s && <div style={{ fontSize: 7, color: "#888", fontFamily: "monospace", marginTop: 2 }}>{s.s}</div>}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 7, color: "#FF3B30", fontFamily: "monospace", letterSpacing: 2, marginBottom: 10 }}>MILITARY & ECONOMIC</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 8, marginBottom: 12 }}>
                  {[
                    { l: "PATRIOT SPEND", v: `$${d.pat}B`, c: "#3478F6", s: "Pre-war stockpile 25%" },
                    { l: "REAPERS LOST", v: `${d.reaper}+`, s: "$32M each (Gen Atomics)" },
                    { l: "DAILY BURN RATE", v: `$${d.daily}B`, c: "#FF6B35", s: "Pentagon est. (CSIS)" },
                    { l: "GDP IMPACT", v: `${d.gdp}%`, c: "#FF6B35", s: "Dallas Fed / Goldman" },
                    { l: "INFLATION ADD", v: `+${d.infl}pp`, s: "Goldman / Oxford Econ" },
                    { l: "RECESSION PROB", v: `${d.rec}%`, s: "Oxford Economics" },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: 8, border: "1px solid #1a1a2a", borderRadius: 2, background: "rgba(255,255,255,.02)" }}>
                      <div style={{ fontSize: 6, color: "#aaa", letterSpacing: 2, fontFamily: "monospace", marginBottom: 2 }}>{s.l}</div>
                      <div style={{ fontSize: 14, color: s.c || "#fff", fontWeight: 700, fontFamily: "monospace" }}>{s.v}</div>
                      {s.s && <div style={{ fontSize: 7, color: "#888", fontFamily: "monospace", marginTop: 2 }}>{s.s}</div>}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 7, color: "#FF3B30", fontFamily: "monospace", letterSpacing: 2, marginBottom: 10 }}>HUMAN COST</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 8 }}>
                  {[
                    { l: "US KIA", v: d.kia, c: "#FF3B30", s: "CENTCOM" },
                    { l: "US WOUNDED", v: `~${d.wound.toLocaleString()}`, s: "CENTCOM (Mar 17)" },
                    { l: "IRAN CIV. DEAD", v: d.civD.toLocaleString(), c: "#FF3B30", s: "Iranian health auth." },
                    { l: "IRAN CIV. WOUNDED", v: d.civW.toLocaleString(), s: "Iranian health auth." },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: 8, border: "1px solid #1a1a2a", borderRadius: 2, background: "rgba(255,255,255,.02)" }}>
                      <div style={{ fontSize: 6, color: "#aaa", letterSpacing: 2, fontFamily: "monospace", marginBottom: 2 }}>{s.l}</div>
                      <div style={{ fontSize: 14, color: s.c || "#fff", fontWeight: 700, fontFamily: "monospace" }}>{s.v}</div>
                      {s.s && <div style={{ fontSize: 7, color: "#888", fontFamily: "monospace", marginTop: 2 }}>{s.s}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* COLOPHON */}
      <div style={{ padding: "50px 24px", textAlign: "center", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ fontSize: 8, letterSpacing: 4, color: "#888", fontFamily: "monospace" }}>WAR ON EVERY SCREEN · SURRENDERING TO THE MACHINE</div>
        <div style={{ fontSize: 7, letterSpacing: 2, color: "#666", fontFamily: "monospace", marginTop: 6, maxWidth: 500, margin: "6px auto 0" }}>
          CENTCOM · CNN · REUTERS · CSIS · RAYTHEON · NAVAIR · CYABRA · ABC · NBC · WSJ · WIRED · HACKREAD
        </div>
      </div>
    </div>
  );
}
