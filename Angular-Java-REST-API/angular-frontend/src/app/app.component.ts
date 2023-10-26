import { Component,OnInit,ViewChild,AfterViewInit } from '@angular/core';

import { CloudServicesConfig } from './editor/common-interfaces';
import { C2isUser } from './c2isuser';
import { NgForm } from '@angular/forms';
import { C2isuserService } from './c2isuser.service';
import { of, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Router } from '@angular/router';


const LOCAL_STORAGE_KEY = 'CKEDITOR_CS_CONFIG';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'angular-frontend';

   users?: C2isUser[];

  public users1 = getUsers();
  
  user: C2isUser = new C2isUser();

  public isWarning = false;

  public selectedUser?: string;

  public channelId = handleChannelIdInUrl();

  @ViewChild( 'form', { static: false } ) public form?: NgForm;

  public config = getStoredConfig();

  public configurationSet = false;
	errorMessage: any;
  //users: User[];
  constructor(private userService: C2isuserService,private router: Router) { }


  ngOnInit() {
	this.getUsers().subscribe(_ =>{
		console.log('ngOnit after getUsers'+this.users.length);
	})

   
/*this.userService.getUserList().
		subscribe(data=>{this.users=data;
			let x=this.users.length;
			console.log("Line 48 : it is not true " +x);
		},error=>this.errorMessage=<any>error );
	*/


  console.log("Line 53 : it is not true " +this.users);

  this.selectUser(this.users1[0]);
    
    this.handleSubmit();
    //this.selectUser(this.user);
	

	console.log("testing testing " + this.users.length);

  }

  public ngAfterViewInit(): void {
	console.log("line 62 after ngAfter View Init");
  }


  public handleSubmit(): void {
		/*if ( !this.form || !this.form.valid ) {
			console.log("Line 30 : it is not true");
			return;
		}*/

		console.log("Line 68 : it is not true " +this.user);

		if(this.isCloudServicesTokenEndpoint()) console.log("It is true: line 36");

		if ( this.isCloudServicesTokenEndpoint() && !this.config.tokenUrl.includes( '?' ) ) {
			this.isWarning = true;
			console.log("Line 36 : it is not true" + this.config.tokenUrl);
			return;
		}

		storeConfig( {
			tokenUrl: getRawTokenUrl( this.config.tokenUrl ),
			ckboxTokenUrl: this.config.ckboxTokenUrl,
			webSocketUrl: this.config.webSocketUrl
		} );

		this.channelId='111112';
		
		console.log("Channelid" +this.channelId);
		
		updateChannelIdInUrl( this.channelId );
		//updateChannelIdInUrl( '11111');

		this.configurationSet = true;
	}

 getUsers() {
    //this.userService.getUserList().subscribe(data => {
      //this.users = data;
      
   // });
	console.log("line 106");
   return this.userService.getUserList().pipe(map(
	(data=>{
	this.users=data;
	console.log("Line 1111 117 :  #### " + this.users.length);
	}
    ))
	);

	//(map(data=>{}))
      
  }


  public selectUser( user: User ): void {
		this.selectedUser = user.id;
		this.isWarning = false;

		const keys = Object.keys( user ) as ( keyof User )[];

    console.log("line 116 "+user.name+" "+user.avatar+" "+user.role );

		this.config.tokenUrl = `${ getRawTokenUrl( this.config.tokenUrl ) }?` + keys
			.filter( key => user[ key ] )
			.map( key => {
				if ( key === 'role' ) {
					return `${ key }=${ user[ key ] }`;
				}

				return `user.${ key }=${ user[ key ] }`;
			} )
			.join( '&' );
	}

  public isCloudServicesTokenEndpoint(): boolean {
		return isCloudServicesTokenEndpoint( this.config.tokenUrl );
	}

	public getUserInitials( name: string ): string {
		return name.split( ' ', 2 ).map( part => part.charAt( 0 ) ).join( '' ).toUpperCase();
	}

  public onEditorReady( editor ): void {
		console.log( 'Editor is ready to use!', editor );
	}

  
}



function getUsers(): User[] {
	return [
		{
			id: 'e1',
			name: 'Tom Rowling',
			avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
			role: 'writer'
		},
		{
			id: 'e2',
			name: 'Wei Hong',
			avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
			role: 'writer'
		},
		{
			id: 'e3',
			name: 'Rani Patel',
			role: 'writer'
		},
		{
			id: 'e4',
			name: 'Henrik Jensen',
			role: 'commentator'
		},
		{
			id: randomString(),
			role: 'writer'
		},
		{
			id: randomString(),
			role: 'reader'
		}
	];
}

interface User {
	id: string;
	name?: string;
	avatar?: string;
	role?: string;
}

function handleChannelIdInUrl(): string {
	let id = getChannelIdFromUrl();

	if ( !id ) {
		id = randomString();
		updateChannelIdInUrl( id );
	}
	
	return id;
}

function getChannelIdFromUrl(): string|null {
	const channelIdMatch = location.search.match( /channelId=(.+)$/ );

	return channelIdMatch ? decodeURIComponent( channelIdMatch[ 1 ] ) : null;
}

function randomString(): string {
	return Math.floor( Math.random() * Math.pow( 2, 52 ) ).toString( 32 );
}

function storeConfig( csConfig: CloudServicesConfig ): void {
	localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( csConfig ) );
}

function updateChannelIdInUrl( id: string ): void {
	window.history.replaceState( {}, document.title, generateUrlWithChannelId( id ) );
}

function generateUrlWithChannelId( id: string ): string {
	return `${ window.location.href.split( '?' )[ 0 ] }?channelId=${ id }`;
}

function getRawTokenUrl( url: string ): string {
	if ( isCloudServicesTokenEndpoint( url ) ) {
		return url.split( '?' )[ 0 ];
	}

	return url;
}

function isCloudServicesTokenEndpoint( tokenUrl: string ): boolean {
	console.log("Line 182 : "+tokenUrl);
	return /cke-cs[\w-]*\.com\/token\/dev/.test( tokenUrl );
}

function getStoredConfig(): CloudServicesConfig {
	const config = JSON.parse( localStorage.getItem( LOCAL_STORAGE_KEY ) || '{}' );
	config.tokenUrl='https://99330.cke-cs.com/token/dev/qETiDA3zwjh2YJ06PO4JmzwCVZY4m610uiDg?limit=10';
	config.webSocketUrl='wss://99330.cke-cs.com/ws';

	/*return {
		//tokenUrl: config.tokenUrl || 'https://99330.cke-cs.com/token/dev/qETiDA3zwjh2YJ06PO4JmzwCVZY4m610uiDg',
		//ckboxTokenUrl: config.ckboxTokenUrl || '',
		//webSocketUrl: config.webSocketUrl || 'wss://99330.cke-cs.com/ws'

		tokenUrl: 'https://99330.cke-cs.com/token/dev/qETiDA3zwjh2YJ06PO4JmzwCVZY4m610uiDg',
		ckboxTokenUrl:  '',
		webSocketUrl:  'wss://99330.cke-cs.com/ws'
	};*/

	return config;
}

