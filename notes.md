#### Dev Hub

`sfdx force:auth:web:login -d -a YOUR-DEV-HUB-ALIAS`

-d declares default

-a gives an alias (use for different clients)

#### Scratch Orgs

`sfdx force:org:create -f config/project-scratch-def.json -s -a YOUR-SCRATCH-ORG-ALIAS -d 30 -w 10`

-d - duration life of scratch org
-w - wait time (defaults to 1min - will timeout if waiting for longer than time

[Sratch org flags / dev](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_org.htm)

`sfdx force:source:pull` can use `-f` to force pull

##### Set permissions

`sfdx force:user:permset:assign -n All_Access`

> cannot set permission sets automatically in a scratch org

#### Data Import

> cannot auto load in data
> can use visualforce or cli command to import data (via JSON)

Apex Classes
`@AuraEnabled` must be `public` and `static`

lightning messaging service - future will replace `pubsub`
triangle of data pushing (visualforce / apex / lwc)

#### References

[LWC Recipes](https://github.com/trailheadapps/lwc-recipes)
