CREATE TABLE "business_card" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"user_id" text NOT NULL,
	"template" text NOT NULL,
	"design" jsonb NOT NULL,
	"qr_code" jsonb NOT NULL,
	"content" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "business_card_workspaceId_unique" UNIQUE("workspace_id"),
	CONSTRAINT "business_card_userId_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "workspace_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"create_and_edit" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "workspace_settings_workspaceId_unique" UNIQUE("workspace_id")
);
--> statement-breakpoint
ALTER TABLE "workspace_members" DROP CONSTRAINT "workspace_members_user_id_workspace_id_pk";--> statement-breakpoint
ALTER TABLE "role_permissions" DROP CONSTRAINT "role_permissions_role_id_permission_id_pk";--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "workspace_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD COLUMN "id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD COLUMN "id" text PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "storage" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "business_card" ADD CONSTRAINT "business_card_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_card" ADD CONSTRAINT "business_card_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_settings" ADD CONSTRAINT "workspace_settings_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file" ADD CONSTRAINT "file_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file" ADD CONSTRAINT "file_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "storage" ADD CONSTRAINT "storage_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_providerId_userId_unique" UNIQUE("provider_id","user_id");--> statement-breakpoint
ALTER TABLE "file" ADD CONSTRAINT "file_workspaceId_unique" UNIQUE("workspace_id");--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_userId_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_userId_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_permissionId_unique" UNIQUE("role_id","permission_id");--> statement-breakpoint
ALTER TABLE "storage" ADD CONSTRAINT "storage_userId_unique" UNIQUE("user_id");