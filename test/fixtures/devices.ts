import { extractBaseType } from '../../src/deviceDefinition.js';

/**
 * Canned device responses, keyed by device type and by the `cd=` request they
 * answer.
 *
 * These are the single source of truth for what a device says: the end-to-end
 * simulator replays them to the real hm2mqtt build, and the discovery baseline
 * is generated from the state they parse into. A baseline therefore describes
 * exactly the entities Home Assistant sees in an end-to-end run — the two can
 * never drift apart.
 *
 * Payloads are real readings with identifying details (WiFi names, MACs)
 * replaced.
 */

export interface DeviceFixture {
  /** Device type as configured in hm2mqtt, e.g. `HMA-1`. */
  deviceType: string;
  /** Human-readable note about where the reading came from. */
  source: string;
  /** Response payload per requested command, e.g. `{ 1: 'cd=1,...' }`. */
  responses: Record<number, string>;
  /** Optional per-device responder for scenarios that exercise writes. */
  createResponder?: () => (request: string) => string | undefined;
}

const b2500V2: DeviceFixture = {
  deviceType: 'HMA-1',
  source: 'B2500 V2 runtime reading (src/parser.test.ts)',
  responses: {
    1:
      'p1=0,p2=0,w1=0,w2=0,pe=14,vv=224,sv=3,cs=0,cd=0,am=0,o1=0,o2=0,do=90,lv=800,cj=1,kn=313,' +
      'g1=0,g2=0,b1=0,b2=0,md=0,d1=1,e1=0:0,f1=23:59,h1=800,d2=0,e2=0:0,f2=23:59,h2=200,d3=0,' +
      'e3=0:0,f3=23:59,h3=800,sg=0,sp=80,st=0,tl=12,th=13,tc=0,tf=0,fc=202310231502,id=5,a0=14,' +
      'a1=0,a2=0,l0=0,l1=0,c0=255,c1=4,bc=622,bs=512,pt=1552,it=1332,m0=0,m1=0,m2=0,m3=0,d4=0,' +
      'e4=2:0,f4=23:59,h4=50,d5=0,e5=0:0,f5=23:59,h5=347,lmo=1377,lmi=614,lmf=0,uv=10',
  },
};

const venus: DeviceFixture = {
  deviceType: 'VNSE3-0',
  source: 'Venus E3 runtime reading (src/parser.test.ts)',
  responses: {
    1:
      'cd=1,tot_i=8848,tot_o=7097,ele_d=537,ele_m=8848,grd_d=328,grd_m=7097,inc_d=0,inc_m=0,' +
      'grd_f=0,grd_o=613,grd_t=3,gct_s=1,cel_s=3,cel_p=327,cel_c=64,err_t=0,err_a=0,dev_n=158,' +
      'grd_y=0,wor_m=0,tim_0=0|0|0|0|0|0|0,cts_m=0,bac_u=0,tra_a=1,tra_i=0,tra_o=0,htt_p=0,' +
      'prc_c=0,prc_d=1,wif_s=33,inc_a=0,set_v=0,mcp_w=2500,mdp_w=2500,ct_t=4,phase_t=1,' +
      'dchrg_t=1,bms_v=212,fc_v=202409090159,wifi_n=e2e-wifi,seq_s=0,ctrl_r=1,par=255,gen=255,' +
      'ble=3,shelly_p=1010,c_ratio=90,dod=88',
  },
};

const jupiterPlus: DeviceFixture = {
  deviceType: 'JPLS-8H',
  source: 'Jupiter Plus firmware 140 runtime reading, from a user report',
  responses: {
    1:
      'cd=1,ele_d=365,ele_m=10919,ele_y=119149,pv1_p=322,pv1_s=1,pv2_p=325,pv2_s=1,pv3_p=330,' +
      'pv3_s=1,pv4_p=323,pv4_s=1,grd_o=400,grd_t=1,gct_s=1,cel_s=1,cel_p=870,cel_c=85,err_t=0,' +
      'wor_m=1,tim_0=0|0|23|59|127|430|1,tim_1=0|0|23|59|127|500|0,tim_2=0|0|23|59|127|600|0,' +
      'tim_3=0|0|23|59|127|700|0,tim_4=0|0|23|59|127|800|0,cts_m=0,grd_d=255,grd_m=9499,' +
      'dev_n=140,dev_i=110,dev_m=213,dev_b=36,dev_t=111,wif_s=40,ala_c=0,ful_d=0,ssid=e2e-wifi,' +
      'stop_s=10,htt_p=0,ct_t=4,phase_t=1,dchrg=0,seq_s=0,ctrl_r=0,shelly_p=1010,c_ratio=100,' +
      'b_lck=0,dod=90,total_b=4,online_b=15',
  },
};

export const venusMiniFixture: DeviceFixture = {
  deviceType: 'VNSEMINI-0',
  source: 'Venus E Mini observed runtime fields with synthetic 100 W schedule values',
  responses: {
    1:
      'gp=0,lp=0,ls=1,eg=0,ig=0,gs=5,cv=0,cm=2,ct=1,' +
      'm1=0,mp1=100,ms1=1,st1=10:00,et1=11:00,re1=127,' +
      'm2=0,mp2=0,ms2=0,st2=00:00,et2=00:00,re2=0,' +
      'm3=0,mp3=0,ms3=0,st3=00:00,et3=00:00,re3=0,' +
      'm4=0,mp4=0,ms4=0,st4=00:00,et4=00:00,re4=0,' +
      'm5=0,mp5=0,ms5=0,st5=00:00,et5=00:00,re5=0,' +
      'm6=0,mp6=0,ms6=0,st6=00:00,et6=00:00,re6=0,' +
      'soc=500,be=1000,dpt=0,do=90,gn=0,ar=1,aw=2,apt=0,' +
      'e1=0,e2=0,e3=0,e4=0,e5=0,e6=0,e7=0,' +
      'dgb=54,dgs=90,dgp=615,dbc=0,dbd=945,tgb=2223,tgs=18634,tgp=25654,tbc=43687,tbd=42239,' +
      'pmu=301,inv=270,dcdc=269,wif_s=1,mq_s=1,wifi_a=44,ct_type=1,dev_sta=0,bbs=2,' +
      'leds=0,gps=0,inv_p=0,ct_ph=1,ser=0,rechg_type=0,time=2026-10-4 10:00:00,' +
      'ups_p=800,lapi_en=0,self_port=50000,rem_port=50000,pv_eg=0,ogpc=0',
  },
  createResponder() {
    const values: Record<string, string> = Object.fromEntries(
      venusMiniFixture.responses[1].split(',').map(pair => pair.split('=')),
    );
    return request => {
      const command = /(?:^|,)cd=(\d+)/.exec(request);
      if (!command) {
        return undefined;
      }
      const code = Number(command[1]);
      if (code === 1) {
        const date = new Date();
        values.time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return Object.entries(values)
          .map(([key, value]) => `${key}=${value}`)
          .join(',');
      }
      if (code >= 47 && code <= 52) {
        const slot = code - 46;
        const update: Record<string, string> = Object.fromEntries(
          request.split(',').map(pair => pair.split('=')),
        );
        const keys = ['m', 'mp', 'ms', 'st', 'et', 're'].map(key => `${key}${slot}`);
        if (keys.some(key => update[key] == null)) {
          return `cd${code}=error`;
        }
        for (const key of keys) {
          values[key] = update[key];
        }
        return `cd${code}=ok`;
      }
      return undefined;
    };
  },
};

/**
 * Fixtures used by the end-to-end scenarios. One device per family keeps a run
 * short while still covering three independent device definitions; the
 * discovery baseline covers every registered device type on its own.
 */
export const deviceFixtures: DeviceFixture[] = [b2500V2, venus, jupiterPlus];

/**
 * Look a fixture up by concrete type (`HMA-1`) or by the registered base type
 * (`HMA`) the device definitions are keyed on.
 */
export function findDeviceFixture(deviceType: string): DeviceFixture | undefined {
  return [...deviceFixtures, venusMiniFixture].find(
    fixture =>
      fixture.deviceType === deviceType || extractBaseType(fixture.deviceType) === deviceType,
  );
}
