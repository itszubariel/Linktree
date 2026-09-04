import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `trigger`,
  head: `Custom`,
  word: `Trigger`,
  tail: `Snippet.`,
  badge: `Fabric API`,
  tags: [
    { icon: `fa-brands fa-java`, label: `Java` },
    { icon: `fa-solid fa-file-code`, label: `JSON` },
  ],
  subtitle: `A complete custom trigger setup for advancement criteria. This example tracks breaking 10 logs. Replace \`yourmod\` with your mod ID throughout.`,
  info: [
    { head: `// how to use`, body: `Create the trigger class, register it in ModTriggers, call registerModTriggers() from your mod initializer, and add the advancement JSON.` },
    { head: `// requirements`, body: `Fabric API, Minecraft 1.20+, Java 17+. Allows custom advancement trigger conditions.` },
  ],
  files: [
    { name: `Trigger.java`, lang: `java`, code: `package com.yourmod.trigger;

import net.minecraft.advancement.criterion.AbstractCriterion;
import net.minecraft.advancement.criterion.CriterionConditions;
import net.minecraft.server.network.ServerPlayerEntity;

public class BreakLogsTrigger extends AbstractCriterion<CriterionConditions> {

    public BreakLogsTrigger() {
        super();
    }

    public void trigger(ServerPlayerEntity player, int logsBroken) {
        if (logsBroken >= 10) {
            this.test(player, new CriterionConditions());
        }
    }
}` },
    { name: `Registration.java`, lang: `java`, code: `package com.yourmod.trigger;

import com.yourmod.YourMod;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.util.Identifier;

public class ModTriggers {

    public static final BreakLogsTrigger BREAK_10_LOGS = register("break_10_logs", new BreakLogsTrigger());

    private static BreakLogsTrigger register(String name, BreakLogsTrigger trigger) {
        return Registry.register(Registries.CUSTOM_STAT, new Identifier(YourMod.MOD_ID, name), trigger);
    }

    public static void registerModTriggers() {
        YourMod.LOGGER.info("Registering triggers for " + YourMod.MOD_ID);
    }
}` },
    { name: `advancement.json`, lang: `java`, code: `{
  "criteria": {
    "break_logs": {
      "trigger": "yourmod:break_10_logs"
    }
  },
  "rewards": {
    "experience": 50,
    "loot": ["yourmod:example_loot"]
  },
  "display": {
    "icon": { "item": "minecraft:oak_log" },
    "title": "Lumberjack",
    "description": "Break 10 logs in survival",
    "frame": "task",
    "show_toast": true,
    "announce_to_chat": true
  }
}` },
  ],
  prev: { label: `custom recipe`, to: `/snippet/mc/recipe` },
  next: { label: `giveaway`, to: `/snippet/bdfd/giveaway` },
};

export function CustomTrigger() {
  return <SnippetDocShell doc={doc} />;
}
