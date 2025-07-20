import { presetForms } from "@julr/unocss-preset-forms";
import {
	defineConfig,
	presetIcons,
	presetWind3,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

export default defineConfig({
	presets: [presetWind3({ dark: "media" }), presetIcons(), presetForms()],
	transformers: [transformerDirectives(), transformerVariantGroup()],

	shortcuts: [
		{
			"flex-center": "flex justify-center items-center",
			"flex-col-center": "flex flex-col justify-center items-center",
		},
	],
});
