const cache = new Map<string, string>();
const pending = new Map<string, Promise<string>>();

/**
 * Removes the flat dark studio background from a product render so the shoe
 * sits directly on the page. Uses a border flood-fill (so dark pixels *inside*
 * the shoe are never punched out) plus a soft distance-based matte for clean,
 * non-faded edges.
 */
export function knockoutDarkBg(src: string): Promise<string> {
  const hit = cache.get(src);
  if (hit) return Promise.resolve(hit);
  const inflight = pending.get(src);
  if (inflight) return inflight;

  const job = new Promise<string>((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve(src);

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, w, h);
        const d = imageData.data;

        // Average the four corners to learn the backdrop colour.
        const at = (x: number, y: number) => {
          const i = (y * w + x) * 4;
          return [d[i], d[i + 1], d[i + 2]] as const;
        };
        const corners = [at(3, 3), at(w - 4, 3), at(3, h - 4), at(w - 4, h - 4)];
        const br = corners.reduce((s, c) => s + c[0], 0) / 4;
        const bg = corners.reduce((s, c) => s + c[1], 0) / 4;
        const bb = corners.reduce((s, c) => s + c[2], 0) / 4;

        const HARD = 30; // fully transparent below this distance
        const SOFT = 58; // fully opaque above this distance

        const dist = (i: number) => {
          const dr = d[i] - br;
          const dg = d[i + 1] - bg;
          const db = d[i + 2] - bb;
          return Math.sqrt(dr * dr + dg * dg + db * db);
        };

        const state = new Uint8Array(w * h); // 0 unvisited, 1 queued/done
        const queue = new Int32Array(w * h);
        let head = 0;
        let tail = 0;

        const seed = (x: number, y: number) => {
          if (x < 0 || y < 0 || x >= w || y >= h) return;
          const p = y * w + x;
          if (state[p]) return;
          state[p] = 1;
          queue[tail++] = p;
        };

        for (let x = 0; x < w; x++) {
          seed(x, 0);
          seed(x, h - 1);
        }
        for (let y = 0; y < h; y++) {
          seed(0, y);
          seed(w - 1, y);
        }

        while (head < tail) {
          const p = queue[head++];
          const i = p * 4;
          const dv = dist(i);
          if (dv >= SOFT) continue; // reached the product silhouette

          if (dv <= HARD) {
            d[i + 3] = 0;
          } else {
            // Soft matte band: keeps anti-aliased edges crisp, not washed out.
            const t = (dv - HARD) / (SOFT - HARD);
            d[i + 3] = Math.round(255 * t * t);
          }

          const x = p % w;
          const y = (p / w) | 0;
          seed(x + 1, y);
          seed(x - 1, y);
          seed(x, y + 1);
          seed(x, y - 1);
        }

        // Remove the dark halo the backdrop leaves on semi-transparent pixels.
        for (let p = 0; p < w * h; p++) {
          const i = p * 4;
          const a = d[i + 3];
          if (a === 0 || a === 255) continue;
          const k = a / 255;
          d[i] = Math.min(255, (d[i] - br * (1 - k)) / k);
          d[i + 1] = Math.min(255, (d[i + 1] - bg * (1 - k)) / k);
          d[i + 2] = Math.min(255, (d[i + 2] - bb * (1 - k)) / k);
        }

        ctx.putImageData(imageData, 0, 0);
        const url = canvas.toDataURL("image/png");
        cache.set(src, url);
        resolve(url);
      } catch {
        resolve(src);
      } finally {
        pending.delete(src);
      }
    };
    img.onerror = () => {
      pending.delete(src);
      resolve(src);
    };
    img.src = src;
  });

  pending.set(src, job);
  return job;
}
