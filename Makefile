# Lokální deploy dokumentace na Webglobe (viz docs/deployment.md nebo CLAUDE.md).
# GitHub Actions runnery nemají přístup na port 20001 (Webglobe firewall),
# proto se nasazuje odsud přes SSH klíč, ne z CI.

SSH_HOST    ?= dw303.webglobe.com
SSH_PORT    ?= 20001
SSH_USER    ?= ssh-731459
REMOTE_PATH ?= /home/html/multi_731459/dalin.cz/_sub/docs
SSH         = ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST)
RSYNC_FLAGS = -av --delete

.PHONY: build deploy deploy-dry-run ssh

build: ## Vyrobí produkční build do dist/ a domirroruje routy na <path>/index.html
	npm run build
	./scripts/mirror-routes.sh

deploy-dry-run: build ## Ukáže, co by se nahrálo/smazalo, beze změny na serveru
	rsync $(RSYNC_FLAGS) --dry-run -e "ssh -p $(SSH_PORT)" ./dist/ "$(SSH_USER)@$(SSH_HOST):$(REMOTE_PATH)"

deploy: build ## Nahraje dist/ na produkci (--delete: smaže na serveru vše, co v dist/ už není)
	rsync $(RSYNC_FLAGS) -e "ssh -p $(SSH_PORT)" ./dist/ "$(SSH_USER)@$(SSH_HOST):$(REMOTE_PATH)"

ssh: ## Interaktivní SSH na docs server
	$(SSH)
