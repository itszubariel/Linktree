import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `block`,
  head: `Custom`,
  word: `Block`,
  tail: `Snippet.`,
  badge: `Fabric API`,
  tags: [
    { icon: `fa-brands fa-java`, label: `Java` },
    { icon: ``, label: `Minecraft 1.20+` },
  ],
  subtitle: `A complete custom block setup for Fabric mods. Includes the block class with on-use action, registration code, and language file entry. Replace \`yourmod\` with your mod ID.`,
  info: [
    { head: `// how to use`, body: `Create the block class, register in ModBlocks, call registerModBlocks() from your mod initializer, and add the lang key to en_us.json.` },
    { head: `// requirements`, body: `Fabric API, Minecraft 1.20+, Java 17+. Works with both client and server.` },
  ],
  files: [
    { name: `ExampleBlock.java`, lang: `java`, code: `package com.yourmod.block;

import net.minecraft.block.Block;
import net.minecraft.block.BlockState;
import net.minecraft.entity.player.PlayerEntity;
import net.minecraft.text.Text;
import net.minecraft.util.ActionResult;
import net.minecraft.util.hit.BlockHitResult;
import net.minecraft.util.math.BlockPos;
import net.minecraft.world.World;

public class ExampleBlock extends Block {

    public ExampleBlock(Settings settings) {
        super(settings);
    }

    // Right-click / use action on the block
    @Override
    public ActionResult onUse(
            BlockState state, World world,
            BlockPos pos, PlayerEntity player,
            BlockHitResult hit) {

        if (!world.isClient) {
            // Your custom logic here
            player.sendMessage(
                Text.literal("You clicked Example Block at " + pos.toShortString()), true
            );
        }

        return ActionResult.SUCCESS;
    }
}` },
    { name: `ModBlocks.java`, lang: `java`, code: `package com.yourmod.block;

import com.yourmod.YourMod;
import net.minecraft.block.AbstractBlock;
import net.minecraft.block.Block;
import net.minecraft.block.MapColor;
import net.minecraft.item.BlockItem;
import net.minecraft.item.Item;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.util.Identifier;

public class ModBlocks {

    public static final Block EXAMPLE_BLOCK = register(
        "example_block",
        new ExampleBlock(
            AbstractBlock.Settings.create()
                .mapColor(MapColor.PURPLE)
                .strength(2.0f, 3.0f)
                .requiresTool()
        )
    );

    private static Block register(String name, Block block) {
        // Register the block
        Block registered = Registry.register(
            Registries.BLOCK,
            Identifier.of(YourMod.MOD_ID, name),
            block
        );
        // Register the block item so it appears in inventory
        Registry.register(
            Registries.ITEM,
            Identifier.of(YourMod.MOD_ID, name),
            new BlockItem(registered, new Item.Settings())
        );
        return registered;
    }

    // Call this from your mod initializer
    public static void registerModBlocks() {
        YourMod.LOGGER.info("Registering blocks for " + YourMod.MOD_ID);
    }
}` },
    { name: `en_us.json`, lang: `java`, code: `{
  "block.yourmod.example_block": "Example Block",
  "item.yourmod.example_block": "Example Block"
}` },
  ],
  prev: { label: `custom advancement`, to: `/snippet/mc/advancement` },
  next: { label: `custom item`, to: `/snippet/mc/item` },
};

export function CustomBlock() {
  return <SnippetDocShell doc={doc} />;
}
