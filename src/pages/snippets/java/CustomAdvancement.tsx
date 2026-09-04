import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `advancement`,
  head: `Custom`,
  word: `Advancement`,
  tail: `Snippet.`,
  badge: `Fabric API`,
  tags: [
    { icon: `fa-brands fa-java`, label: `Java` },
    { icon: `fa-solid fa-file-code`, label: `JSON` },
  ],
  subtitle: `A complete custom advancement setup with custom trigger. Includes the criterion class, registration code, and advancement JSON. Replace \`yourmod\` with your mod ID throughout.`,
  info: [
    { head: `// how to use`, body: `Create the custom criterion class, register it in ModAdvancements, and create the advancement JSON in data/yourmod/advancements.` },
    { head: `// requirements`, body: `Fabric API, Minecraft 1.20+, Java 17+. Custom triggers allow unique advancement conditions.` },
  ],
  files: [
    { name: `advancement.json`, lang: `java`, code: `{
  "display": {
    "icon": { "item": "minecraft:diamond" },
    "title": "Example Advancement",
    "description": "Awarded for clicking the diamond block",
    "frame": "task",
    "show_toast": true,
    "announce_to_chat": true,
    "hidden": false
  },
  "criteria": {
    "clicked_diamond": {
      "trigger": "yourmod:clicked_diamond_block"
    }
  },
  "rewards": { "experience": 100 }
}` },
    { name: `Criterion.java`, lang: `java`, code: `package com.yourmod.advancement;

import net.minecraft.advancement.criterion.AbstractCriterion;
import net.minecraft.entity.player.PlayerEntity;
import net.minecraft.server.network.ServerPlayerEntity;
import net.minecraft.util.Identifier;

public class ClickedDiamondCriterion extends AbstractCriterion<ClickedDiamondCriterion.Conditions> {

    public ClickedDiamondCriterion() {
        super(new Identifier("yourmod", "clicked_diamond_block"));
    }

    @Override
    public Conditions conditionsFromJson(com.google.gson.JsonObject json) {
        return new Conditions();
    }

    public void trigger(ServerPlayerEntity player) {
        this.test(player, Conditions::new);
    }

    public static class Conditions extends AbstractCriterion.Conditions {
        public Conditions() { super(); }
    }
}` },
    { name: `Registration.java`, lang: `java`, code: `package com.yourmod.advancement;

import com.yourmod.YourMod;
import net.minecraft.advancement.criterion.CriterionRegistry;

public class ModAdvancements {

    public static void registerAdvancements() {
        YourMod.LOGGER.info("Registering custom advancements...");
        CriterionRegistry.register(new ClickedDiamondCriterion());
    }
}` },
  ],
  prev: { label: `simple clicker game`, to: `/snippet/web/clicker` },
  next: { label: `custom block`, to: `/snippet/mc/block` },
};

export function CustomAdvancement() {
  return <SnippetDocShell doc={doc} />;
}
