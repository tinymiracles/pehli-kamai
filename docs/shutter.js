/* Pehli Kamai — the shutter.
   A Mumbai shopfront shutter rolls up on load and reveals the first earning inside.
   Global THREE (UMD r149). */
(function () {
  const rr = (c, x, y, w, h, r) => {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  };

  function tex(w, h, draw) {
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    draw(cv.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(cv);
    t.anisotropy = 16;
    if (THREE.SRGBColorSpace !== undefined) t.colorSpace = THREE.SRGBColorSpace;
    else t.encoding = THREE.sRGBEncoding;
    return t;
  }

  function slabGeo(w, h, d, r) {
    const s = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h);
    s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    const b = Math.min(d * 0.3, 0.02);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: d - b * 2, bevelEnabled: true, bevelThickness: b,
      bevelSize: b, bevelSegments: 3, curveSegments: 14
    });
    g.translate(0, 0, -d / 2 + b);
    g.computeVertexNormals();
    const pos = g.attributes.position, uv = g.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
    uv.needsUpdate = true;
    return g;
  }

  /* ₹ note face */
  function noteTex() {
    return tex(700, 320, (c, W, H) => {
      c.fillStyle = '#e8f2e9'; c.fillRect(0, 0, W, H);
      c.strokeStyle = '#96c4a6'; c.lineWidth = 8;
      c.strokeRect(18, 18, W - 36, H - 36);
      c.strokeStyle = '#c2ddca'; c.lineWidth = 3;
      c.strokeRect(38, 38, W - 76, H - 76);
      c.fillStyle = '#2f7d4a'; c.font = '700 150px Georgia, serif';
      c.fillText('₹', 62, 216);
      c.fillStyle = '#b9d7c3';
      c.beginPath(); c.arc(W - 150, H / 2, 78, 0, 7); c.fill();
      c.fillStyle = '#7fb695';
      [104, 148, 192].forEach(y => { rr(c, 226, y, 250, 16, 8); c.fill(); });
      c.fillStyle = '#5d9c78'; c.font = '600 26px Inter, sans-serif';
      c.fillText('PEHLI KAMAI', 226, 262);
    });
  }

  /* the envelope, standing on the plinth */
  function envTex() {
    return tex(720, 480, (c, W, H) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#f7facc'; c.fillRect(0, 0, W, 132);
      c.fillStyle = '#e3ed55'; c.fillRect(0, 128, W, 10);
      c.fillStyle = '#0d2426'; c.font = 'italic 700 68px Georgia, serif';
      c.fillText('Pehli Kamai', 46, 250);
      c.fillStyle = '#4a6b6e'; c.font = '400 31px Inter, sans-serif';
      c.fillText('The first earning', 48, 302);
      c.fillStyle = '#e4eced'; c.fillRect(48, 344, W - 96, 4);
      c.fillStyle = '#00838a'; c.font = '600 27px Inter, sans-serif';
      c.fillText('Tiny Miracles · Mumbai', 48, 400);
      c.fillStyle = '#00838a'; c.beginPath(); c.arc(W - 108, 66, 42, 0, 7); c.fill();
      c.fillStyle = '#ffffff'; c.font = '700 50px Georgia, serif';
      c.textAlign = 'center'; c.fillText('₹', W - 108, 85);
    });
  }

  function signTex() {
    return tex(1600, 200, (c, W, H) => {
      c.fillStyle = '#e3ed55'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#c9d442'; c.fillRect(0, H - 14, W, 14);
      c.fillStyle = '#0d2426';
      c.font = '800 76px Inter, sans-serif';
      c.textAlign = 'center';
      c.fillText('PEHLI  KAMAI', W / 2, 92);
      c.font = '400 40px Georgia, serif';
      c.fillStyle = '#3d5b2a';
      c.fillText('पहली कमाई  ·  Tiny Miracles', W / 2, 148);
      c.textAlign = 'left';
      c.fillStyle = '#0d2426';
      c.beginPath(); c.arc(96, 100, 42, 0, 7); c.fill();
      c.fillStyle = '#e3ed55'; c.font = '700 46px Georgia, serif';
      c.textAlign = 'center'; c.fillText('₹', 96, 118);
    });
  }

  function grimeTex() {
    return tex(256, 256, (c, W, H) => {
      c.fillStyle = '#0b2226'; c.fillRect(0, 0, W, H);
      for (let i = 0; i < 900; i++) {
        const a = Math.random() * 0.05;
        c.fillStyle = 'rgba(255,255,255,' + a + ')';
        c.fillRect(Math.random() * W, Math.random() * H, 2, 2);
      }
      for (let i = 0; i < 22; i++) {
        c.fillStyle = 'rgba(0,0,0,0.14)';
        c.fillRect(Math.random() * W, 0, 1 + Math.random() * 3, H);
      }
    });
  }

  /* corrugated metal for the shutter slats */
  function slatTex() {
    return tex(64, 64, (c, W, H) => {
      const g = c.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#123b40');
      g.addColorStop(0.34, '#1d565c');
      g.addColorStop(0.52, '#26696f');
      g.addColorStop(0.7, '#1a4f55');
      g.addColorStop(1, '#0f3438');
      c.fillStyle = g; c.fillRect(0, 0, W, H);
    });
  }

  class Shutter extends HTMLElement {
    connectedCallback() {
      if (this._on) {
        if (this._tick) { cancelAnimationFrame(this._raf); this._raf = requestAnimationFrame(this._tick); }
        return;
      }
      this._on = true;
      this.style.display = 'block';
      this.style.position = 'relative';
      this.style.width = '100%';
      this.style.height = (parseInt(this.getAttribute('h') || '760', 10)) + 'px';
      const wait = () => (window.THREE ? this.init() : setTimeout(wait, 60));
      wait();
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
        this._on = false;
        this._tick = null;
      }, 0);
    }

    init() {
      const el = this;
      if (THREE.ColorManagement) {
        if ('legacyMode' in THREE.ColorManagement) THREE.ColorManagement.legacyMode = false;
        THREE.ColorManagement.enabled = true;
      }
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      if (renderer.outputColorSpace !== undefined) renderer.outputColorSpace = THREE.SRGBColorSpace;
      else renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.cursor = 'default';
      this._renderer = renderer;
      el.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

      /* environment */
      const envScene = new THREE.Scene();
      envScene.background = new THREE.Color(0x0e2124);
      const lampE = (x, y, z, s, col, i) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(s, s),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(i) }));
        m.position.set(x, y, z); m.lookAt(0, 0, 0); envScene.add(m);
      };
      lampE(0, 10, 12, 22, 0xffffff, 0.75);
      lampE(-10, 3, 8, 14, 0xd9eff0, 0.4);
      lampE(9, 2, 4, 14, 0x00838a, 0.35);
      const pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();
      scene.environment = pmrem.fromScene(envScene, 0.04).texture;
      pmrem.dispose();

      const key = new THREE.DirectionalLight(0xfff4e6, 1.15);
      key.position.set(5, 10, 12);
      key.castShadow = true;
      key.shadow.mapSize.set(768, 768);
      scene.add(key);
      const rimL = new THREE.DirectionalLight(0x5fd8d0, 0.55);
      rimL.position.set(-8, 3, 4);
      scene.add(rimL);
      scene.add(new THREE.AmbientLight(0x6e9498, 0.16));

      const M = (col, r, m) => new THREE.MeshStandardMaterial({
        color: col, roughness: r === undefined ? 0.6 : r, metalness: m || 0
      });
      // printed surfaces: real albedo, lit by the scene, with a touch of self-glow
      const screenM = (map, i) => new THREE.MeshStandardMaterial({
        map: map, color: 0xffffff, roughness: 0.82, metalness: 0,
        emissive: 0xffffff, emissiveMap: map, emissiveIntensity: i === undefined ? 0.14 : i
      });

      const world = new THREE.Group();
      world.position.x = 2.8;
      scene.add(world);

      const W = 9.2, H = 6.4;

      /* ── shopfront: recessed interior box ── */
      const inner = new THREE.Mesh(new THREE.BoxGeometry(W, H, 5.2),
        M(0x0a2226, 0.95));
      inner.material.side = THREE.BackSide;
      inner.position.set(0, H / 2, -2.6);
      inner.receiveShadow = true;
      world.add(inner);

      // back wall, warmly lit
      const back = new THREE.Mesh(new THREE.PlaneGeometry(W, H), M(0x0d2b30, 0.95));
      back.position.set(0, H / 2, -5.1);
      back.receiveShadow = true;
      world.add(back);

      /* ── frame: pillars, lintel, sill ── */
      const grime = grimeTex();
      grime.wrapS = grime.wrapT = THREE.RepeatWrapping;
      grime.repeat.set(2, 3);
      const stone = new THREE.MeshStandardMaterial({ map: grime, color: 0x2a4a4e, roughness: 0.92 });
      const mkBox = (w, h, d, mat, x, y, z) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.position.set(x, y, z);
        m.castShadow = true; m.receiveShadow = true;
        world.add(m);
        return m;
      };
      mkBox(1.15, H + 1.5, 1.5, stone, -(W / 2 + 0.5), (H + 1.5) / 2 - 0.2, 0.2);
      mkBox(1.15, H + 1.5, 1.5, stone, W / 2 + 0.5, (H + 1.5) / 2 - 0.2, 0.2);
      mkBox(W + 2.3, 1.2, 1.7, stone, 0, H + 0.65, 0.25);
      // signboard on the lintel
      const board = new THREE.Mesh(slabGeo(W + 0.7, 0.86, 0.18, 0.06),
        [new THREE.MeshBasicMaterial({ map: signTex(), toneMapped: false }), M(0xb9c235, 0.5)]);
      board.position.set(0, H + 0.6, 1.08);
      board.castShadow = true;
      world.add(board);
      const boardLip = mkBox(W + 1.0, 0.1, 0.34, M(0x0a1f22, 0.7), 0, H + 1.08, 1.16, 0.03);
      // sill
      mkBox(W + 2.3, 0.5, 2.0, M(0x0a1f22, 0.85), 0, -0.18, 0.4);
      // pavement
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(70, 26), M(0x0a1c1f, 0.95));
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(0, -0.42, 6);
      ground.receiveShadow = true;
      world.add(ground);

      /* ── neighbours either side: closed shutters, dimmer ── */
      function neighbour(cx) {
        const nw = 6.4, nh = 5.2;
        const rec = new THREE.Mesh(new THREE.BoxGeometry(nw, nh, 2.2), M(0x081c1f, 0.95));
        rec.material.side = THREE.BackSide;
        rec.position.set(cx, nh / 2, -1.1);
        world.add(rec);
        const nMap = slatTex();
        nMap.wrapS = nMap.wrapT = THREE.RepeatWrapping;
        nMap.repeat.set(1, nh / 0.26);
        const closed = new THREE.Mesh(new THREE.BoxGeometry(nw - 0.2, nh, 0.16),
          new THREE.MeshStandardMaterial({ map: nMap, roughness: 0.6, metalness: 0.45, color: 0x2e4144 }));
        closed.position.set(cx, nh / 2, 0.04);
        closed.castShadow = true; closed.receiveShadow = true;
        world.add(closed);
        mkBox(nw + 1.6, 1.0, 1.5, stone, cx, nh + 0.5, 0.2);
        mkBox(1.0, nh + 1.0, 1.4, stone, cx - (nw / 2 + 0.5), (nh + 1.0) / 2 - 0.2, 0.18);
        mkBox(1.0, nh + 1.0, 1.4, stone, cx + (nw / 2 + 0.5), (nh + 1.0) / 2 - 0.2, 0.18);
        mkBox(nw + 1.6, 0.42, 1.9, M(0x0a1f22, 0.85), cx, -0.2, 0.36);
      }
      neighbour(-(W / 2 + 1.0 + 3.2 + 0.5));
      neighbour(W / 2 + 1.0 + 3.2 + 0.5);

      /* ── hanging bulb over the sill ── */
      const flex = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.5, 8), M(0x1b3c40, 0.7));
      flex.position.set(-3.1, H - 0.75, -0.5);
      world.add(flex);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 14),
        new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffca6e, emissiveIntensity: 2.4, roughness: 1 }));
      bulb.position.set(-3.1, H - 1.58, -0.5);
      world.add(bulb);
      const bulbLight = new THREE.PointLight(0xffc46a, 0, 7, 2);
      bulbLight.position.copy(bulb.position);
      scene.add(bulbLight);

      /* ── inside: plinth, envelope, note stack ── */
      const plinth = mkBox(3.6, 1.5, 2.0, M(0x086268, 0.6), 0, 0.75, -3.0, 0.1);
      mkBox(3.9, 0.16, 2.3, M(0xe3ed55, 0.5), 0, 1.58, -3.0, 0.05);

      const envMesh = new THREE.Mesh(slabGeo(2.5, 1.66, 0.15, 0.1),
        [screenM(envTex()), M(0xe9f1f1, 0.5)]);
      envMesh.position.set(0, 3.05, -3.05);
      envMesh.rotation.set(-0.1, 0, 0.03);
      envMesh.castShadow = true;
      world.add(envMesh);

      // stack of notes on the plinth
      const noteMap = noteTex();
      const notes = [];
      for (let i = 0; i < 6; i++) {
        const n = new THREE.Mesh(slabGeo(2.0, 0.94, 0.07, 0.05),
          [screenM(noteMap, 1.0), M(0xdce9e0, 0.6)]);
        n.userData = { i, rz: -0.3 + i * 0.115, dx: -1.35 + i * 0.54 };
        n.castShadow = true;
        notes.push(n);
        world.add(n);
      }

      // shelf of files along the back
      mkBox(6.4, 0.14, 0.9, M(0x11373c, 0.8), 0, 4.5, -4.55, 0.03);
      mkBox(6.4, 0.14, 0.9, M(0x11373c, 0.8), 0, 3.3, -4.55, 0.03);
      for (let i = 0; i < 7; i++) {
        const fh = 0.62 + (i % 3) * 0.09;
        mkBox(0.42, fh, 0.62, M([0x1b4a50, 0x24575d, 0x143f45][i % 3], 0.85),
          -2.2 + i * 0.74, 4.58 + fh / 2, -4.5);
      }
      for (let i = 0; i < 6; i++) {
        const fh = 0.58 + (i % 2) * 0.12;
        mkBox(0.46, fh, 0.62, M([0x24575d, 0x143f45, 0x1b4a50][i % 3], 0.85),
          -1.9 + i * 0.76, 3.38 + fh / 2, -4.5);
      }

      // a soft fill inside so the printed pieces read
      const insideFill = new THREE.PointLight(0xdff0ef, 0, 10, 2);
      insideFill.position.set(0.4, 4.4, -1.2);
      scene.add(insideFill);

      // interior glow spilling out
      const warm = new THREE.PointLight(0xffdf9a, 0, 9, 2);
      warm.position.set(0, 3.2, -1.6);
      scene.add(warm);
      const limeGlow = new THREE.PointLight(0xe3ed55, 0, 9, 2);
      limeGlow.position.set(0, 1.9, -2.2);
      scene.add(limeGlow);

      /* ── the shutter: corrugated slats ── */
      const shutter = new THREE.Group();
      world.add(shutter);
      const slatMat = new THREE.MeshStandardMaterial({
        map: slatTex(), roughness: 0.42, metalness: 0.65
      });
      const PITCH = 0.26, NSLAT = Math.ceil(H / PITCH) + 1;
      const slats = [];
      for (let i = 0; i < NSLAT; i++) {
        const s = new THREE.Mesh(new THREE.BoxGeometry(W - 0.1, PITCH * 0.94, 0.16), slatMat);
        s.castShadow = true; s.receiveShadow = true;
        s.userData = { base: i * PITCH + PITCH / 2 };
        shutter.add(s);
        slats.push(s);
      }
      // shutter roll housing under the lintel
      const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, W - 0.1, 24),
        M(0x0d2b2f, 0.5, 0.4));
      roll.rotation.z = Math.PI / 2;
      roll.position.set(0, H + 0.02, 0.42);
      roll.castShadow = true;
      world.add(roll);
      // handle
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.055, 10, 24),
        M(0xb9c9c9, 0.35, 0.8));
      handle.position.set(0, 0.5, 0.12);
      shutter.add(handle);

      /* ── camera ── */
      let mx = 0, my = 0, tmx = 0, tmy = 0;
      const cv = renderer.domElement;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        tmx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        tmy = ((e.clientY - r.top) / r.height - 0.5) * 2;
      });
      el.addEventListener('pointerleave', () => { tmx = 0; tmy = 0; });

      const size = () => {
        const w = el.clientWidth || 1200, h = el.clientHeight || 760;
        renderer.setSize(w, h);
        cv.style.width = '100%'; cv.style.height = '100%';
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      size();
      this._ro = new ResizeObserver(size);
      this._ro.observe(el);

      /* ── open sequence ── */
      let p = 0, running = true, delay = 0.55;
      this.replay = () => { p = 0; running = true; delay = 0.3; };
      this.setOpen = (v) => { p = Math.max(0, Math.min(1, v)); running = false; if (this._step) this._step(0); };

      const easeOut = x => 1 - Math.pow(1 - x, 2.6);
      const clock = new THREE.Clock();
      let t = 0;
      const step = (dt) => {
        t += dt;

        if (running) {
          if (delay > 0) delay -= dt;
          else {
            p = Math.min(1, p + dt / 2.4);
            if (p >= 1) running = false;
          }
        }
        const e = easeOut(p);

        mx += (tmx - mx) * 0.05;
        my += (tmy - my) * 0.05;
        camera.position.set(mx * 1.8, 4.3 - my * 1.1, 21.5);
        camera.lookAt(mx * 0.5, 3.5, 0);

        // slats ride up; anything past the lintel curls onto the roll
        const rise = e * (H + 0.6);
        slats.forEach(s => {
          const y = s.userData.base + rise;
          if (y > H - 0.05) {
            const over = Math.min(1, (y - (H - 0.05)) / 0.9);
            s.position.set(0, H - 0.05 + over * 0.1, 0.06 + over * 0.42);
            s.rotation.x = over * 1.3;
            s.scale.set(1, Math.max(0.06, 1 - over), Math.max(0.3, 1 - over * 0.6));
            s.visible = over < 0.98;
          } else {
            s.position.set(0, y, 0.06);
            s.rotation.x = 0;
            s.scale.set(1, 1, 1);
            s.visible = true;
          }
        });
        handle.position.y = 0.5 + rise;
        handle.visible = handle.position.y < H - 0.2;

        // light spills out as it opens
        warm.intensity = 4.8 * e;
        limeGlow.intensity = 1.1 * e;
        bulbLight.intensity = 2.6 * e;
        insideFill.intensity = 8.5 * e;
        bulb.material.emissiveIntensity = 0.15 + 2.3 * e;

        // envelope and notes settle in once there's a gap to see through
        const inSide = Math.max(0, Math.min(1, (e - 0.28) / 0.72));
        const ie = easeOut(inSide);
        envMesh.position.y = 3.05 - (1 - ie) * 0.7;
        envMesh.material[0].emissiveIntensity = 0.3 * ie;
        envMesh.scale.setScalar(0.9 + 0.1 * ie);

        notes.forEach(n => {
          const u = n.userData;
          const own = easeOut(Math.max(0, Math.min(1, (e - 0.3 - u.i * 0.045) / 0.5)));
          n.position.set(
            u.dx * own,
            2.02 - (1 - own) * 1.15,
            -2.18 + u.i * 0.035
          );
          n.rotation.set(-0.07, 0, u.rz * own);
          n.scale.setScalar(0.35 + 0.65 * own);
          n.material[0].emissiveIntensity = 0.3 * own;
        });

        // a slow breath once open, so it isn't dead still
        if (!running) {
          envMesh.position.y = 3.05 + Math.sin(t * 0.85) * 0.045;
          envMesh.rotation.z = 0.03 + Math.sin(t * 0.7) * 0.018;
          warm.intensity = 4.8 + Math.sin(t * 1.3) * 0.4;
          bulbLight.intensity = 2.6 + Math.sin(t * 2.1) * 0.28;
          insideFill.intensity = 8.5;
        }

        renderer.render(scene, camera);
      };
      const tick = () => {
        this._raf = requestAnimationFrame(tick);
        step(Math.min(clock.getDelta(), 0.05));
      };
      this._step = step;
      this._tick = tick;
      tick();
    }
  }

  if (!customElements.get('pk-shutter')) customElements.define('pk-shutter', Shutter);
})();
