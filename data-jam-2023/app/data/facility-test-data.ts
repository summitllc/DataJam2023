interface Facility {
  name: string | null;
  name1: string | null;
  name2: string | null;
  street1: string | null;
  street2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  zip4: string | null;
  county: string | null;
  phone: string | null;
  intake_prompt: string | null;
  intake1: string | null;
  intake2: string | null;
  website: string | null;
  latitude: string | null;
  longitude: string | null;
  type_facility: string | null;
  mh: string | null;
  psy: string | null;
  rtcc: string | null;
  rtca: string | null;
  ores: string | null;
  ph: string | null;
  omh: string | null;
  cmhc: string | null;
  msmh: string | null;
  ipt: string | null;
  cft: string | null;
  gt: string | null;
  cbt: string | null;
  dbt: string | null;
  idd: string | null;
  at: string | null;
  ect: string | null;
  tele: string | null;
  smon: string | null;
  smpd: string | null;
  smop: string | null;
  hi: string | null;
  res: string | null;
  phdt: string | null;
  op: string | null;
  vamc: string | null;
  tbg: string | null;
  ih: string | null;
  sf: string | null;
  md: string | null;
  mc: string | null;
  si: string | null;
  pi: string | null;
  mi: string | null;
  smha: string | null;
  swfs: string | null;
  scjj: string | null;
  sef: string | null;
  osf: string | null;
  clf: string | null;
  csbg: string | null;
  cmhg: string | null;
  vaf: string | null;
  cit: string | null;
  wi: string | null;
  ss: string | null;
  pa: string | null;
  ah: string | null;
  sp: string | null;
  co: string | null;
  gl: string | null;
  vet: string | null;
  adm: string | null;
  mf: string | null;
  cj: string | null;
  se: string | null;
  hv: string | null;
  trma: string | null;
  sed: string | null;
  smi: string | null;
  alz: string | null;
  ptsd: string | null;
  tbi: string | null;
  tay: string | null;
  ped: string | null;
  act: string | null;
  icm: string | null;
  cm: string | null;
  cdm: string | null;
  peer: string | null;
  coot: string | null;
  dec: string | null;
  es: string | null;
  fpsy: string | null;
  hs: string | null;
  imr: string | null;
  ipc: string | null;
  lad: string | null;
  nrt: string | null;
  nsc: string | null;
  prs: string | null;

  stu: string | null;
  sps: string | null;
  semp: string | null;
  sh: string | null;
  tpc: string | null;
  tcc: string | null;
  vrs: string | null;
  chld: string | null;
  yad: string | null;
  adlt: string | null;
  snr: string | null;
  itu: string | null;
  pvtp: string | null;
  pvtn: string | null;
  fqhc: string | null;
  sumh: string | null;
  cbhc: string | null;
  chlor: string | null;
  drope: string | null;
  fluph: string | null;
  halop: string | null;
  loxap: string | null;
  perph: string | null;
  pimoz: string | null;
  proch: string | null;
  thiot: string | null;
  thior: string | null;
  trifl: string | null;
  aripi: string | null;
  asena: string | null;
  brexp: string | null;
  carip: string | null;
  cloza: string | null;
  ilope: string | null;
  luras: string | null;
  olanz: string | null;
  olanzf: string | null;
  palip: string | null;
  queti: string | null;
  rispe: string | null;
  zipra: string | null;
  crt: string | null;
  emdr: string | null;
  kit: string | null;
  tms: string | null;
  peon: string | null;
  peoff: string | null;
  fg: string | null;
  pcf: string | null;
  dv: string | null;
  pefp: string | null;
  hivt: string | null;
  stdt: string | null;
  tbs: string | null;
  aot: string | null;
  msnh: string | null;
  ipsy: string | null;
  shp: string | null;
  vahc: string | null;
  antpych: string | null;
  aim: string | null;
  fed: string | null;
  mhc: string | null;
  hbt: string | null;
  hct: string | null;
  labt: string | null;
  vapn: string | null;
  vapp: string | null;
  vppd: string | null;
  nx: string | null;
  fx: string | null;
  f17: string | null;
  f19: string | null;
  f25: string | null;
  f28: string | null;
  f30: string | null;
  f31: string | null;
  f35: string | null;
  f36: string | null;
  f37: string | null;
  f4: string | null;
  f42: string | null;
  f43: string | null;
  f47: string | null;
  f66: string | null;
  f67: string | null;
  f70: string | null;
  f81: string | null;
  f92: string | null;
  n24: string | null;
  n40: string | null;
  coor: [string, string];
  distance: string | null;
  }
  
  const facilityTestData: Facility[] = [
    {
      name: "Test Facility Full Data #1",
      name1: "So Others Might Eat",
      name2: null,
      street1: "Test 1 Street",
      street2: null,
      city: "Washington",
      state: "DC",
      zip: "20001",
      zip4: null,
      county: "District of Columbia",
      phone: "555-797-1111",
      intake_prompt: null,
      intake1: null,
      intake2: null,
      website: "http://www.some.org/",
      latitude: "38.9082416",
      longitude: "-77.0110598",
      type_facility: "MH",
      mh: "1.0",
      psy: null,
      rtcc: null,
      rtca: null,
      ores: null,
      ph: null,
      omh: "1.0",
      cmhc: null,
      msmh: null,
      ipt: "1.0",
      cft: null,
      gt: "1.0",
      cbt: "1.0",
      dbt: null,
      idd: null,
      at: null,
      ect: null,
      tele: "1.0",
      smon: null,
      smpd: "1.0",
      smop: null,
      hi: null,
      res: null,
      phdt: null,
      op: "1.0",
      vamc: null,
      tbg: null,
      ih: null,
      sf: null,
      md: "1.0",
      mc: "1.0",
      si: "1.0",
      pi: null,
      mi: null,
      smha: null,
      swfs: null,
      scjj: null,
      sef: null,
      osf: null,
      clf: null,
      csbg: null,
      cmhg: null,
      vaf: null,
      cit: null,
      wi: null,
      ss: "1.0",
      pa: "1.0",
      ah: "1.0",
      sp: null,
      co: "1.0",
      gl: null,
      vet: null,
      adm: null,
      mf: null,
      cj: null,
      se: null,
      hv: null,
      trma: "1.0",
      sed: null,
      smi: null,
      alz: null,
      ptsd: "1.0",
      tbi: null,
      tay: null,
      ped: null,
      act: null,
      icm: null,
      cm: "1.0",
      cdm: "1.0",
      peer: null,
      coot: null,
      dec: "1.0",
      es: null,
      fpsy: null,
      hs: null,
      imr: null,
      ipc: "1.0",
      lad: null,
      nrt: "1.0",
      nsc: "1.0",
      prs: null,
      stu: "1.0",
      sps: null,
      semp: null,
      sh: null,
      tpc: null,
      tcc: "1.0",
      vrs: null,
      chld: null,
      yad: "1.0",
      adlt: "1.0",
      snr: "1.0",
      itu: null,
      pvtp: null,
      pvtn: "1.0",
      fqhc: "1.0",
      sumh: "1.0",
      cbhc: null,
      chlor: null,
      drope: null,
      fluph: null,
      halop: null,
      loxap: null,
      perph: null,
      pimoz: null,
      proch: null,
      thiot: null,
      thior: null,
      trifl: null,
      aripi: null,
      asena: null,
      brexp: null,
      carip: null,
      cloza: null,
      ilope: null,
      luras: null,
      olanz: null,
      olanzf: null,
      palip: null,
      queti: null,
      rispe: null,
      zipra: null,
      crt: null,
      emdr: "1.0",
      kit: null,
      tms: null,
      peon: null,
      peoff: null,
      fg: null,
      pcf: null,
      dv: null,
      pefp: null,
      hivt: null,
      stdt: null,
      tbs: null,
      aot: null,
      msnh: null,
      ipsy: null,
      shp: null,
      vahc: null,
      antpych: "1.0",
      aim: null,
      fed: null,
      mhc: null,
      hbt: null,
      hct: null,
      labt: null,
      vapn: null,
      vapp: null,
      vppd: "1.0",
      nx: null,
      fx: null,
      f17: null,
      f19: null,
      f25: null,
      f28: null,
      f30: null,
      f31: null,
      f35: null,
      f36: null,
      f37: null,
      f4: null,
      f42: null,
      f43: null,
      f47: null,
      f66: null,
      f67: null,
      f70: null,
      f81: null,
      f92: null,
      n24: null,
      n40: null,
      coor: ["38.9082416","-77.0110598"],
      distance: "0.76"
    },
    {
      name: "Test Facility Full Data #2",
      name1: "So Others Might Eat",
      name2: null,
      street1: "Test 2 Street",
      street2: null,
      city: "Washington",
      state: "DC",
      zip: "20001",
      zip4: null,
      county: "District of Columbia",
      phone: "555-797-2222",
      intake_prompt: null,
      intake1: null,
      intake2: null,
      website: "http://www.some.org/",
      latitude: "38.9082416",
      longitude: "-77.0110598",
      type_facility: "MH",
      mh: "1.0",
      psy: null,
      rtcc: null,
      rtca: null,
      ores: null,
      ph: null,
      omh: "1.0",
      cmhc: null,
      msmh: null,
      ipt: "1.0",
      cft: null,
      gt: "1.0",
      cbt: "1.0",
      dbt: null,
      idd: null,
      at: null,
      ect: null,
      tele: "1.0",
      smon: null,
      smpd: "1.0",
      smop: null,
      hi: null,
      res: null,
      phdt: null,
      op: "1.0",
      vamc: null,
      tbg: null,
      ih: null,
      sf: null,
      md: "1.0",
      mc: "1.0",
      si: "1.0",
      pi: null,
      mi: null,
      smha: null,
      swfs: null,
      scjj: null,
      sef: null,
      osf: null,
      clf: null,
      csbg: null,
      cmhg: null,
      vaf: null,
      cit: null,
      wi: null,
      ss: "1.0",
      pa: "1.0",
      ah: "1.0",
      sp: null,
      co: "1.0",
      gl: null,
      vet: null,
      adm: null,
      mf: null,
      cj: null,
      se: null,
      hv: null,
      trma: "1.0",
      sed: null,
      smi: null,
      alz: null,
      ptsd: "1.0",
      tbi: null,
      tay: null,
      ped: null,
      act: null,
      icm: null,
      cm: "1.0",
      cdm: "1.0",
      peer: null,
      coot: null,
      dec: "1.0",
      es: null,
      fpsy: null,
      hs: null,
      imr: null,
      ipc: "1.0",
      lad: null,
      nrt: "1.0",
      nsc: "1.0",
      prs: null,
      stu: "1.0",
      sps: null,
      semp: null,
      sh: null,
      tpc: null,
      tcc: "1.0",
      vrs: null,
      chld: null,
      yad: "1.0",
      adlt: "1.0",
      snr: "1.0",
      itu: null,
      pvtp: null,
      pvtn: "1.0",
      fqhc: "1.0",
      sumh: "1.0",
      cbhc: null,
      chlor: null,
      drope: null,
      fluph: null,
      halop: null,
      loxap: null,
      perph: null,
      pimoz: null,
      proch: null,
      thiot: null,
      thior: null,
      trifl: null,
      aripi: null,
      asena: null,
      brexp: null,
      carip: null,
      cloza: null,
      ilope: null,
      luras: null,
      olanz: null,
      olanzf: null,
      palip: null,
      queti: null,
      rispe: null,
      zipra: null,
      crt: null,
      emdr: "1.0",
      kit: null,
      tms: null,
      peon: null,
      peoff: null,
      fg: null,
      pcf: null,
      dv: null,
      pefp: null,
      hivt: null,
      stdt: null,
      tbs: null,
      aot: null,
      msnh: null,
      ipsy: null,
      shp: null,
      vahc: null,
      antpych: "1.0",
      aim: null,
      fed: null,
      mhc: null,
      hbt: null,
      hct: null,
      labt: null,
      vapn: null,
      vapp: null,
      vppd: "1.0",
      nx: null,
      fx: null,
      f17: null,
      f19: null,
      f25: null,
      f28: null,
      f30: null,
      f31: null,
      f35: null,
      f36: null,
      f37: null,
      f4: null,
      f42: null,
      f43: null,
      f47: null,
      f66: null,
      f67: null,
      f70: null,
      f81: null,
      f92: null,
      n24: null,
      n40: null,
      coor: ["38.9082416","-77.0110598"],
      distance: "0.76"
    },
    {
      name: "Test Facility Full Data #3",
      name1: "So Others Might Eat 3",
      name2: null,
      street1: "Test 3 Street",
      street2: null,
      city: "Washington",
      state: "DC",
      zip: "20001",
      zip4: null,
      county: "District of Columbia",
      phone: "555-797-3333",
      intake_prompt: null,
      intake1: null,
      intake2: null,
      website: "http://www.some.org/",
      latitude: "38.9082416",
      longitude: "-77.0110598",
      type_facility: "MH",
      mh: "1.0",
      psy: null,
      rtcc: null,
      rtca: null,
      ores: null,
      ph: null,
      omh: "1.0",
      cmhc: null,
      msmh: null,
      ipt: "1.0",
      cft: null,
      gt: "1.0",
      cbt: "1.0",
      dbt: null,
      idd: null,
      at: null,
      ect: null,
      tele: "1.0",
      smon: null,
      smpd: "1.0",
      smop: null,
      hi: null,
      res: null,
      phdt: null,
      op: "1.0",
      vamc: null,
      tbg: null,
      ih: null,
      sf: null,
      md: "1.0",
      mc: "1.0",
      si: "1.0",
      pi: null,
      mi: null,
      smha: null,
      swfs: null,
      scjj: null,
      sef: null,
      osf: null,
      clf: null,
      csbg: null,
      cmhg: null,
      vaf: null,
      cit: null,
      wi: null,
      ss: "1.0",
      pa: "1.0",
      ah: "1.0",
      sp: null,
      co: "1.0",
      gl: null,
      vet: null,
      adm: null,
      mf: null,
      cj: null,
      se: null,
      hv: null,
      trma: "1.0",
      sed: null,
      smi: null,
      alz: null,
      ptsd: "1.0",
      tbi: null,
      tay: null,
      ped: null,
      act: null,
      icm: null,
      cm: "1.0",
      cdm: "1.0",
      peer: null,
      coot: null,
      dec: "1.0",
      es: null,
      fpsy: null,
      hs: null,
      imr: null,
      ipc: "1.0",
      lad: null,
      nrt: "1.0",
      nsc: "1.0",
      prs: null,
      stu: "1.0",
      sps: null,
      semp: null,
      sh: null,
      tpc: null,
      tcc: "1.0",
      vrs: null,
      chld: null,
      yad: "1.0",
      adlt: "1.0",
      snr: "1.0",
      itu: null,
      pvtp: null,
      pvtn: "1.0",
      fqhc: "1.0",
      sumh: "1.0",
      cbhc: null,
      chlor: null,
      drope: null,
      fluph: null,
      halop: null,
      loxap: null,
      perph: null,
      pimoz: null,
      proch: null,
      thiot: null,
      thior: null,
      trifl: null,
      aripi: null,
      asena: null,
      brexp: null,
      carip: null,
      cloza: null,
      ilope: null,
      luras: null,
      olanz: null,
      olanzf: null,
      palip: null,
      queti: null,
      rispe: null,
      zipra: null,
      crt: null,
      emdr: "1.0",
      kit: null,
      tms: null,
      peon: null,
      peoff: null,
      fg: null,
      pcf: null,
      dv: null,
      pefp: null,
      hivt: null,
      stdt: null,
      tbs: null,
      aot: null,
      msnh: null,
      ipsy: null,
      shp: null,
      vahc: null,
      antpych: "1.0",
      aim: null,
      fed: null,
      mhc: null,
      hbt: null,
      hct: null,
      labt: null,
      vapn: null,
      vapp: null,
      vppd: "1.0",
      nx: null,
      fx: null,
      f17: null,
      f19: null,
      f25: null,
      f28: null,
      f30: null,
      f31: null,
      f35: null,
      f36: null,
      f37: null,
      f4: null,
      f42: null,
      f43: null,
      f47: null,
      f66: null,
      f67: null,
      f70: null,
      f81: null,
      f92: null,
      n24: null,
      n40: null,
      coor: ["38.9082416","-77.0110598"],
      distance: "0.76"
    }
  ];
  
export default facilityTestData;  