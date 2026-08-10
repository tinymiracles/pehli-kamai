/* Pehli Kamai — How it works, in 3D.
   A cluster of resumes on the left, a curved path (teal → lime) through a
   "trained & matched" checkpoint, ending in three real animated human
   figures (a free CC0/public-domain rigged model by Quaternius, via
   Poly Pizza — docs/animated-human.glb) tinted to the brand's teal/lime.
   Continuous idle animation — no reveal, no replay needed.
   The resume cluster is clickable: fires a `resumeclick` CustomEvent that
   bubbles, so the page can wire it to navigate to the candidate list.

   This is the one component on the site that needs three.js's GLTFLoader,
   which only ships as an ES module — so unlike shutter.js (a classic script
   using the global THREE from the UMD build), this file is loaded as
   type="module" and imports its own THREE + loaders. The rest of the site
   is untouched by that — shutter.js keeps using the classic/global build. */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone as skeletonClone } from 'three/addons/utils/SkeletonUtils.js';

function tex(w, h, draw) {
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  draw(cv.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function resumeTex(bg, line1, line2) {
  return tex(140, 180, (c, W, H) => {
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    c.fillStyle = line1; c.fillRect(16, 22, W - 58, 9);
    c.fillStyle = line2; c.fillRect(16, 42, W - 80, 9);
    c.fillStyle = line2; c.fillRect(16, 58, W - 70, 9);
    c.fillStyle = line2; c.fillRect(16, 86, W - 40, 6);
    c.fillStyle = line2; c.fillRect(16, 98, W - 56, 6);
    c.fillStyle = line2; c.fillRect(16, 110, W - 46, 6);
  });
}
function checkTex() {
  return tex(160, 160, (c, W, H) => {
    c.clearRect(0, 0, W, H);
    c.strokeStyle = '#0d2427'; c.lineWidth = 8;
    c.beginPath(); c.arc(W / 2, H / 2, W / 2 - 8, 0, Math.PI * 2); c.stroke();
    c.strokeStyle = '#5fd8d0'; c.lineWidth = 10; c.lineCap = 'round'; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(46, 82); c.lineTo(70, 106); c.lineTo(114, 52); c.stroke();
  });
}

// Loaded once, shared across every <pk-hiw3d> instance on the page.
let humanGltfPromise = null;
function loadHumanGltf() {
  if (!humanGltfPromise) {
    humanGltfPromise = new Promise((resolve, reject) => {
      new GLTFLoader().load('animated-human.glb', resolve, undefined, reject);
    });
  }
  return humanGltfPromise;
}

class Hiw3D extends HTMLElement {
  connectedCallback() {
    if (this._on) {
      if (this._tick) { cancelAnimationFrame(this._raf); this._raf = requestAnimationFrame(this._tick); }
      return;
    }
    this._on = true;
    this.style.display = 'block';
    this.init();
  }
  disconnectedCallback() {
    setTimeout(() => {
      if (this.isConnected) return;
      cancelAnimationFrame(this._raf);
      if (this._ro) this._ro.disconnect();
      if (this._renderer) {
        this._renderer.dispose();
        const ctx = this._renderer.getContext();
        const lose = ctx && ctx.getExtension('WEBGL_lose_context');
        if (lose) lose.loseContext();
        this._renderer = null;
      }
      this._on = false; this._tick = null; this._mixers = null;
    }, 0);
  }

  async init() {
    const el = this;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    this._renderer = renderer;
    el.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const key = new THREE.DirectionalLight(0xdfeeee, 0.7); key.position.set(3, 5, 6); scene.add(key);
    const rim = new THREE.DirectionalLight(0x5fd8d0, 0.6); rim.position.set(-4, 2, 3); scene.add(rim);

    const flat = (map) => new THREE.MeshLambertMaterial({ map, color: 0xffffff });
    const flatC = (color) => new THREE.MeshLambertMaterial({ color });

    /* the path: a curved tube, teal → lime along its length via vertex colours */
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.6, -0.15, 0),
      new THREE.Vector3(-1.6, 0.55, 0.1),
      new THREE.Vector3(0, 0.65, 0),
      new THREE.Vector3(1.6, 0.05, -0.1),
      new THREE.Vector3(4.4, -0.15, 0),
    ]);
    const tubeGeo = new THREE.TubeGeometry(curve, 120, 0.045, 10, false);
    const posAttr = tubeGeo.attributes.position;
    const colorsArr = [];
    const cTeal = new THREE.Color(0x1d4a4e), cMid = new THREE.Color(0x00838a), cLime = new THREE.Color(0xe3ed55);
    for (let i = 0; i < posAttr.count; i++) {
      const u = i / posAttr.count;
      const col = u < 0.5 ? cTeal.clone().lerp(cMid, u / 0.5) : cMid.clone().lerp(cLime, (u - 0.5) / 0.5);
      colorsArr.push(col.r, col.g, col.b);
    }
    tubeGeo.setAttribute('color', new THREE.Float32BufferAttribute(colorsArr, 3));
    scene.add(new THREE.Mesh(tubeGeo, new THREE.MeshBasicMaterial({ vertexColors: true })));

    /* resume cluster — the clickable part */
    const resumeGroup = new THREE.Group();
    resumeGroup.position.set(-4.6, -0.15, 0);
    const rTex = [resumeTex('#1a3438', '#557478', '#3f6266'), resumeTex('#1e3a3e', '#5c7b7f', '#45696d'), resumeTex('#234043', '#62807f', '#4b6d70')];
    const resumeMeshes = [];
    rTex.forEach((t, i) => {
      const geo = new THREE.BoxGeometry(0.72, 0.92, 0.03);
      const side = flatC(0x0a2226);
      const m = new THREE.Mesh(geo, [side, side, side, side, flat(t), flat(t)]);
      m.position.set(i * 0.1 - 0.1, i * 0.06 - 0.06, i * 0.04);
      m.rotation.z = -0.14 + i * 0.13;
      resumeGroup.add(m); resumeMeshes.push(m);
    });
    scene.add(resumeGroup);

    /* training checkpoint badge */
    const badge = new THREE.Mesh(new THREE.CircleGeometry(0.34, 32), flat(checkTex()));
    badge.position.set(0, 0.65, 0.05);
    scene.add(badge);
    const badgeRing = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.37, 32), new THREE.MeshBasicMaterial({ color: 0x0d2427 }));
    badgeRing.position.copy(badge.position); badgeRing.position.z -= 0.001;
    scene.add(badgeRing);

    /* three real animated human figures, tinted to brand colours */
    const figureColors = [0xe3ed55, 0x5fd8d0, 0x00838a];
    const figures = new THREE.Group();
    const mixers = [];
    this._mixers = mixers;
    try {
      const gltf = await loadHumanGltf();
      const idleClip = gltf.animations.find(a => /idle/i.test(a.name)) || gltf.animations[0];
      // Measure once, in the model's own rest pose, before any cloning/scaling —
      // re-measuring a cloned SkinnedMesh's Box3 after scaling hit a degenerate
      // result in testing (skeleton bind matrices not settled yet), so a single
      // fixed scale + fixed ground offset is used for every clone instead.
      const srcBox = new THREE.Box3().setFromObject(gltf.scene);
      const srcSize = srcBox.getSize(new THREE.Vector3());
      const srcHeight = srcSize.y > 0.01 ? srcSize.y : 5.5; // sane fallback, matches this model's known rest height
      const targetScale = 0.85 / srcHeight;
      const groundY = -0.15 - srcBox.min.y * targetScale;

      figureColors.forEach((col, i) => {
        const clone = skeletonClone(gltf.scene);
        clone.traverse(o => {
          if (o.isMesh) { o.material = o.material.clone(); o.material.color.setHex(col); }
        });
        clone.scale.setScalar(targetScale);
        clone.position.set(4.4 + (i - 1) * 0.5, groundY, (i - 1) * 0.15);
        clone.rotation.y = Math.PI * 0.15 * (i - 1);
        figures.add(clone);

        const mixer = new THREE.AnimationMixer(clone);
        const action = mixer.clipAction(idleClip);
        action.time = i * 1.7; // stagger so the three don't move in lockstep
        action.play();
        mixers.push(mixer);
      });
    } catch (e) {
      // If the model fails to load (offline/blocked), fail quietly rather than
      // leaving a broken scene — the path/resumes/badge still render fine on their own.
      console.warn('pk-hiw3d: human model failed to load, continuing without figures', e);
    }
    scene.add(figures);

    const confetti = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 6), flatC(0xe3ed55));
      d.position.set(4.6 + Math.random() * 0.8, 0.5 + Math.random() * 0.6, (Math.random() - 0.5) * 0.4);
      d.userData = { ph: Math.random() * 10 };
      confetti.add(d);
    }
    scene.add(confetti);

    /* click detection: resume cluster only */
    const raycaster = new THREE.Raycaster();
    const mouseNdc = new THREE.Vector2();
    let hovering = false;
    function ndcFromEvent(e) {
      const r = el.getBoundingClientRect();
      mouseNdc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouseNdc.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    }
    el.addEventListener('pointermove', e => {
      ndcFromEvent(e);
      raycaster.setFromCamera(mouseNdc, camera);
      const isHot = raycaster.intersectObjects(resumeMeshes).length > 0;
      if (isHot !== hovering) { hovering = isHot; el.classList.toggle('hot', isHot); }
    });
    el.addEventListener('click', e => {
      ndcFromEvent(e);
      raycaster.setFromCamera(mouseNdc, camera);
      if (raycaster.intersectObjects(resumeMeshes).length > 0) {
        el.dispatchEvent(new CustomEvent('resumeclick', { bubbles: true }));
      }
    });

    const size = () => {
      const w = el.clientWidth || 1200, h = el.clientHeight || 340;
      renderer.setSize(w, h);
      renderer.domElement.style.width = '100%'; renderer.domElement.style.height = '100%';
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    size();
    this._ro = new ResizeObserver(size);
    this._ro.observe(el);

    camera.position.set(0, 0.3, 5.6);
    camera.lookAt(0, 0.15, 0);

    const clock = new THREE.Clock(); let t = 0;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = (dt) => {
      t += dt;
      mixers.forEach(m => m.update(dt));
      if (!reduced) {
        resumeGroup.position.y = -0.15 + Math.sin(t * 0.9) * 0.02;
        confetti.children.forEach(d => { d.position.y += Math.sin(t * 2 + d.userData.ph) * 0.0006; d.rotation.x = t + d.userData.ph; });
        badge.rotation.z = Math.sin(t * 0.6) * 0.03;
      }
      renderer.render(scene, camera);
    };
    const tick = () => { this._raf = requestAnimationFrame(tick); step(Math.min(clock.getDelta(), 0.05)); };
    this._step = step; this._tick = tick; tick();
  }
}
if (!customElements.get('pk-hiw3d')) customElements.define('pk-hiw3d', Hiw3D);
